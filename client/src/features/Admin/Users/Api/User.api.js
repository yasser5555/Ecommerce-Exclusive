import axiosInstance from "../../../../shared/services/axiosInstance";

// This function requests the full list of users from the admin backend endpoint.
export const getAllUsersAPI = async () => {
  try {
    // This sends the GET request to the user listing endpoint.
    const response = await axiosInstance.get("/admin/get_all_users");
    // This returns the backend response payload for the store to handle.
    return response.data;
  } catch (error) {
    // This catches any request failure and logs it for debugging.
    console.error(`error at Admin.userApi.getAllUsersAPI ${error}`);
    // This rethrows the error so the UI layer can handle it correctly.
    throw error;
  }
};

export const getActiveUsersAPI = async () => {
  try {
    const response = await axiosInstance.get("/admin/get_active_users");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.userApi.getActiveUsersAPI ${error}`);
    throw error;
  }
};

export const getBlockedUsersAPI = async () => {
  try {
    const response = await axiosInstance.get("/admin/get_blocked_users");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.userApi.getBlockedUsersAPI ${error}`);
    throw error;
  }
};

export const getAdminUsersAPI = async () => {
  try {
    const response = await axiosInstance.get("/admin/get_admin_users");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.userApi.getAdminUsersAPI ${error}`);
    throw error;
  }
};

export const getRegularUsersAPI = async () => {
  try {
    const response = await axiosInstance.get("/admin/get_regular_users");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.userApi.getRegularUsersAPI ${error}`);
    throw error;
  }
};

// This function searches users by term using the backend search endpoint.
export const searchUsersAPI = async (searchTerm) => {
  try {
    // This sends the search phrase to the backend search route.
    const response = await axiosInstance.post("/admin/search_user", {
      searchTerm,
    });
    // This returns the matching user list from the server.
    return response.data;
  } catch (error) {
    // This catches any issue that happens while searching the users.
    console.error(`error at Admin.userApi.searchUsersAPI ${error}`);
    // This rethrows the error so the calling store handles the failure.
    throw error;
  }
};

// This function updates the user status using the admin status endpoint.
export const updateUserStatusAPI = async (user_id, new_status) => {
  try {
    // This sends the user id and new status to the backend patch route.
    const response = await axiosInstance.patch("/admin/update_user_status", {
      user_id,
      new_status,
    });
    // This returns the backend update result.
    return response.data;
  } catch (error) {
    // This catches any failure while updating the user status.
    console.error(`error at Admin.userApi.updateUserStatusAPI ${error}`);
    // This rethrows the error so the store can show the failure state.
    throw error;
  }
};

// This function updates the selected user's role through the admin role endpoint.
export const modifyUserRoleAPI = async (user_id, new_role) => {
  try {
    // This sends the user id and new role to the backend patch route.
    const response = await axiosInstance.patch("/admin/modify_user_role", {
      user_id,
      new_role,
    });
    // This returns the backend response from the role update.
    return response.data;
  } catch (error) {
    // This catches any role update failure from the API layer.
    console.error(`error at Admin.userApi.modifyUserRoleAPI ${error}`);
    // This rethrows the error so the UI can show an error state.
    throw error;
  }
};

// This function deletes a user using the admin delete endpoint.
export const deleteUserAPI = async (user_id) => {
  try {
    // This sends the selected user id to the delete route.
    const response = await axiosInstance.post("/admin/delete_user", {
      user_id,
    });
    // This returns the server confirmation for the deletion operation.
    return response.data;
  } catch (error) {
    // This catches any issue while deleting the user.
    console.error(`error at Admin.userApi.deleteUserAPI ${error}`);
    // This rethrows the error so the store can keep the UI consistent.
    throw error;
  }
};
