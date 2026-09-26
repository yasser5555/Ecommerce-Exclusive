import React, { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import UserStatis from "../Component/UserStatis";
import User_table from "../Component/User_table";
import { useAdminUsersStore } from "../Store/user.store";

export default function Users() {
  // This reads the user list, stats, and loading flag from the store.
  const {
    users,
    stats,
    loading,
    fetchUsers,
    fetchUsersByFilters,
    searchUsers,
    updateUserStatus,
    updateUserRole,
    deleteUser,
  } = useAdminUsersStore();
  // This keeps the local input value for the search box.
  const [search, setSearch] = useState("");
  // This sets the current page for the client-side pagination flow.
  const [currentPage, setCurrentPage] = useState(1);
  // This sets the number of rows shown on each page.
  const pageSize = 5;
  // This calculates the total number of pages for the active user list.
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  // This slices the current users list to the active page only.
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // This loads the user list when the screen mounts.
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // This loads all admin users from the backend.
        await fetchUsers();
      } catch (error) {
        // This logs any failure while loading the users.
        console.error(`error at Users.loadUsers ${error}`);
      }
    };
    // This triggers the initial fetch on first render.
    loadUsers();
  }, [fetchUsers]);

  // This resets the page number whenever the dataset or search keyword changes.
  useEffect(() => {
    // This resets the current page to the first page.
    setCurrentPage(1);
  }, [users.length, search]);

  // This handles the search workflow from the input field.
  const handleSearch = async (value) => {
    try {
      // This updates the visible input state.
      setSearch(value);
      // This sends the search term to the backend.
      await searchUsers(value);
    } catch (error) {
      // This logs any search request failure.
      console.error(`error at Users.handleSearch ${error}`);
    }
  };

  // This applies the selected status/role filter from the table UI.
  const handleFilterChange = async (statusFilter = "all", roleFilter = "all") => {
    try {
      setCurrentPage(1);
      await fetchUsersByFilters(statusFilter, roleFilter);
    } catch (error) {
      console.error(`error at Users.handleFilterChange ${error}`);
    }
  };

  // This refreshes the screen with the latest users from the backend.
  const handleRefresh = async () => {
    try {
      // This clears the search field before reloading the list.
      setSearch("");
      // This reloads the server data for the page.
      await fetchUsers();
    } catch (error) {
      // This logs any refresh issue.
      console.error(`error at Users.handleRefresh ${error}`);
    }
  };

  // This updates the selected user's status and keeps the cache consistent.
  const handleStatusChange = async (userId, value) => {
    try {
      // This sends the new status update to the backend.
      await updateUserStatus(userId, value);
    } catch (error) {
      // This logs any status update failure.
      console.error(`error at Users.handleStatusChange ${error}`);
    }
  };

  // This updates the selected user's role and applies it immediately.
  const handleRoleChange = async (userId, value) => {
    try {
      // This sends the new role to the backend role update route.
      await updateUserRole(userId, value);
    } catch (error) {
      // This logs any role update failure.
      console.error(`error at Users.handleRoleChange ${error}`);
    }
  };

  // This deletes the selected user from the backend and the UI list.
  const handleDelete = async (userId) => {
    try {
      // This triggers the delete request to the backend.
      await deleteUser(userId);
    } catch (error) {
      // This logs any deletion failure.
      console.error(`error at Users.handleDelete ${error}`);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
           <h2 className="fw-bold mb-0">Customer Management</h2>
        </div>
        
      </div>

      <UserStatis stats={stats} />

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 p-4">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-light border-0">
              <Search size={18} />
            </span>
            <input
              className="form-control bg-light border-0"
              placeholder="Search users by email..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
        </div>

        <User_table
          users={paginatedUsers}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}
