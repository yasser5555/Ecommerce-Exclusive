import { create } from "zustand";
import {
  currentUserRequest,
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
} from "../api/auth.Api.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  authChecked: false,
  isLoading: false,
  rememberMe: false,
  error: null,

  initializeAuth: async () => {
    if (get().authChecked || get().isLoading) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const data = await currentUserRequest();
      set({
        user: data.user,
        isAuthenticated: true,
        authChecked: true,
        isLoading: false,
      });
    } catch (error) {
      const isUnauthorized = error.response?.status === 401;
      set({
        user: null,
        isAuthenticated: false,
        authChecked: true,
        isLoading: false,
        error: isUnauthorized
          ? null
          : error.response?.data?.message || error.message,
      });
      if (!isUnauthorized) {
        throw error;
      }
    }
  },

  register: async (payload) => {
    try {
      set({ isLoading: true, error: null });
      const data = await registerRequest(payload);
      set({
        user: data.user,
        isAuthenticated: true,
        authChecked: true,
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (payload, rememberMe) => {
    try {
      set({ isLoading: true, error: null });
      const data = await loginRequest(payload);
      set({
        user: data.user,
        isAuthenticated: true,
        authChecked: true,
        rememberMe,
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || error?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({
      user: null,
      isAuthenticated: false,
      authChecked: true,
      error: null,
    });
    await logoutRequest();
  },

  forgotPassword: async (email) => {
    try {
      set({ isLoading: true, error: null });
      const data = await forgotPasswordRequest(email);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      set({ isLoading: true, error: null });
      const data = await resetPasswordRequest(token, password);
      set({ isLoading: false });
      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      throw error;
    }
  },
}));
