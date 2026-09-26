import { create } from "zustand";
import {
  deleteUserAPI,
  getActiveUsersAPI,
  getAdminUsersAPI,
  getAllUsersAPI,
  getBlockedUsersAPI,
  getRegularUsersAPI,
  modifyUserRoleAPI,
  searchUsersAPI,
  updateUserStatusAPI,
} from "../Api/User.api";

// This helper builds summary counts from the user list for the cards on screen.
const buildUserStats = (userList) => {
  try {
    // This stores the full user list for calculation.
    const safeUsers = Array.isArray(userList) ? userList : [];
    // This calculates the total number of users in the current list.
    const totalUsers = safeUsers.length;
    // This counts active users based on their status value.
    const activeUsers = safeUsers.filter(
      (user) => String(user.status).toLowerCase() === "active",
    ).length;
    // This counts blocked users using the backend status field.
    const blockedUsers = safeUsers.filter(
      (user) => String(user.status).toLowerCase() === "blocked",
    ).length;
    // This counts admins using the backend role field.
    const admins = safeUsers.filter(
      (user) => String(user.role).toLowerCase() === "admin",
    ).length;
    // This returns the calculated summary object for the dashboard cards.
    return { totalUsers, activeUsers, blockedUsers, admins };
  } catch (error) {
    // This catches any problem while calculating statistics.
    console.error(`error at Admin.userStore.buildUserStats ${error}`);
    // This returns a safe default when the calculation fails.
    return { totalUsers: 0, activeUsers: 0, blockedUsers: 0, admins: 0 };
  }
};

// This store keeps the admin user state and handles server actions in one place.
export const useAdminUsersStore = create((set, get) => ({
  // This stores the live users list returned from the backend.
  users: [],
  // This tracks whether the data is currently loading.
  loading: false,
  // This stores the latest request error message for the UI.
  error: null,
  // This stores the current search keyword.
  searchTerm: "",
  // This stores the computed stats for the summary cards.
  stats: { totalUsers: 0, activeUsers: 0, blockedUsers: 0, admins: 0 },

  // This method fetches every user from the backend and updates the UI state.
  fetchUsers: async () => {
    try {
      // This marks the UI as loading before the request begins.
      set({ loading: true, error: null });
      // This asks the API layer for the full users list.
      const response = await getAllUsersAPI();
      // This normalizes the returned payload to an array.
      const nextUsers = Array.isArray(response) ? response : [];
      // This computes the latest metrics for the stat cards.
      const nextStats = buildUserStats(nextUsers);
      // This updates the state with fresh user and stat data.
      set({ users: nextUsers, stats: nextStats, loading: false });
      // This returns the array so the component can continue its flow.
      return nextUsers;
    } catch (error) {
      // This catches any backend failure while fetching users.
      set({
        loading: false,
        error: error?.message || "Unable to fetch users",
      });
      // This rethrows the error so the screen can report it properly.
      throw error;
    }
  },

  // This method searches users from the server and updates the screen state.
  searchUsers: async (keyword) => {
    try {
      // This trims empty values before sending the request.
      const safeKeyword = String(keyword || "").trim();
      // This stores the current search value for UI tracking.
      set({ loading: true, error: null, searchTerm: safeKeyword });
      // This chooses the correct backend route for either a search or a reset.
      const response = safeKeyword ? await searchUsersAPI(safeKeyword) : await getAllUsersAPI();
      // This normalizes the response to an array.
      const nextUsers = Array.isArray(response) ? response : [];
      // This recalculates stats after the search result changes.
      const nextStats = buildUserStats(nextUsers);
      // This updates the user list and stat summary.
      set({ users: nextUsers, stats: nextStats, loading: false });
      // This returns the filtered list so the page can render it.
      return nextUsers;
    } catch (error) {
      // This catches any issue during the search request.
      set({
        loading: false,
        error: error?.message || "Unable to search users",
      });
      // This rethrows the error to the caller for handling.
      throw error;
    }
  },

  // This method loads user data using the specific status/role endpoints.
  fetchUsersByFilters: async (statusFilter = "all", roleFilter = "all") => {
    try {
      set({ loading: true, error: null });

      const safeStatus = String(statusFilter || "all").toLowerCase();
      const safeRole = String(roleFilter || "all").toLowerCase();

      let nextUsers = [];

      if (safeStatus === "all" && safeRole === "all") {
        nextUsers = await getAllUsersAPI();
      } else if (safeStatus !== "all" && safeRole === "all") {
        nextUsers =
          safeStatus === "active" ? await getActiveUsersAPI() : await getBlockedUsersAPI();
      } else if (safeStatus === "all" && safeRole !== "all") {
        nextUsers =
          safeRole === "admin" ? await getAdminUsersAPI() : await getRegularUsersAPI();
      } else {
        const [statusUsers, roleUsers] = await Promise.all([
          safeStatus === "active" ? getActiveUsersAPI() : getBlockedUsersAPI(),
          safeRole === "admin" ? getAdminUsersAPI() : getRegularUsersAPI(),
        ]);

        const roleUserIds = new Set(
          (Array.isArray(roleUsers) ? roleUsers : []).map((user) => Number(user.id)),
        );

        nextUsers = (Array.isArray(statusUsers) ? statusUsers : []).filter((user) =>
          roleUserIds.has(Number(user.id)),
        );
      }

      const nextStats = buildUserStats(nextUsers);
      set({ users: nextUsers, stats: nextStats, loading: false });
      return nextUsers;
    } catch (error) {
      set({
        loading: false,
        error: error?.message || "Unable to apply user filters",
      });
      throw error;
    }
  },

  // This method updates a user's status and then refreshes the local list.
  updateUserStatus: async (userId, newStatus) => {
    try {
      // This sends the update request to the API layer.
      const response = await updateUserStatusAPI(userId, newStatus);
      // This updates the matching user in local state immediately and refreshes stats.
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          Number(user.id) === Number(userId)
            ? { ...user, status: newStatus }
            : user,
        );
        return {
          users: updatedUsers,
          stats: buildUserStats(updatedUsers),
        };
      });
      // This returns the backend response for the component flow.
      return response;
    } catch (error) {
      // This catches any failure during the status update.
      set({ error: error?.message || "Unable to update user status" });
      // This rethrows the error so the screen can notify the user.
      throw error;
    }
  },

  // This method updates a user's role and keeps the local state in sync.
  updateUserRole: async (userId, newRole) => {
    try {
      // This sends the role update request to the backend.
      const response = await modifyUserRoleAPI(userId, newRole);
      // This updates the matching user locally and recalculates the summary.
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          Number(user.id) === Number(userId)
            ? { ...user, role: newRole }
            : user,
        );
        return {
          users: updatedUsers,
          stats: buildUserStats(updatedUsers),
        };
      });
      // This returns the result payload from the backend.
      return response;
    } catch (error) {
      // This catches any issue while changing the user's role.
      set({ error: error?.message || "Unable to update user role" });
      // This rethrows the error for the calling component.
      throw error;
    }
  },

  // This method deletes a user and removes them instantly from the user list.
  deleteUser: async (userId) => {
    try {
      // This sends the delete request to the backend endpoint.
      const response = await deleteUserAPI(userId);
      // This removes the deleted user and recalculates the summary in one update.
      set((state) => {
        const remainingUsers = state.users.filter(
          (user) => Number(user.id) !== Number(userId),
        );
        return {
          users: remainingUsers,
          stats: buildUserStats(remainingUsers),
        };
      });
      // This returns the backend response for the action result.
      return response;
    } catch (error) {
      // This catches any deletion failure from the backend.
      set({ error: error?.message || "Unable to delete user" });
      // This rethrows the error so the page can log or alert the user.
      throw error;
    }
  },
}));
