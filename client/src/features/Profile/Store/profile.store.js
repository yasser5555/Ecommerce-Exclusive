import { create } from "zustand";

import {
  getProfileRequest,
  updateProfileRequest,
  uploadAvatarRequest,
  updataAvatarRequest,
  GetProfileData,
  GetUserCards,
  addUserCards,
  deleteUserCards,
  addUserAddress,
  GetUserAddress,
  GetUserOrders,
} from "../api/profile.api";

export const useProfileStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  profileStats: null,
  userCards: null,
  userAddresses: null,
  userOrders: null,
  fetchProfile: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await getProfileRequest();
      set({
        profile: response,
        isLoading: false,
      });

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfile: async (payload) => {
    const response = await updateProfileRequest(payload);
    set({
      profile: response.data,
      isLoading: false,
    });
    return response;
  },

  uploadAvatar: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await uploadAvatarRequest(payload);
      set({
        profile: response.user,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  updataAvatar: async (payload) => {
    const response = await updataAvatarRequest(payload);
    set({
      profile: response.user ?? response,
      isLoading: false,
    });
    return response;
  },

  GetProfileStats: async (user_id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await GetProfileData(user_id);
      set({
        profileStats: response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },

  Get_UserCards: async (user_id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await GetUserCards(user_id);
      set({
        userCards: response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },

  add_UserCards: async (payload) => {
    try {
      set({ isLoading: true, error: null });
      const response = await addUserCards(payload);
      set((state) => ({
        userCards: [...(state.userCards || []), response],
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  delete_UserCards: async (card_id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await deleteUserCards({
        data: {
          card_id,
        },
      });

      set((state) => ({
        userCards: (state.userCards || []).filter(
          (card) => card.id !== card_id,
        ),
        isLoading: false,
      }));
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },
  fetchUserAddresses: async (data) => {
    try {
      set({
        isLoading: true,
        error: null,
      });
      const response = await GetUserAddress(data);
      set({
        userAddresses: response,
        isLoading: false,
      });
      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },

  add_UserAddress: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await addUserAddress(payload);

      set((state) => ({
        userAddresses: [...(state.userAddresses || []), response],
        isLoading: false,
      }));

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },
  fetchUserOrders: async (data) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await GetUserOrders(data);

      set({
        userOrders: response.user_orders || [],
        isLoading: false,
      });

      return response;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });

      throw error;
    }
  },
}));
