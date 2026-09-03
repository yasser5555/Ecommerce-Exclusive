import { create } from "zustand";
import { persist } from "zustand/middleware";
import { forgotPasswordRequest, resetPasswordRequest, loginRequest, registerRequest } from "../api/auth.Api.js";
import { data } from "react-router-dom";
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      rememberMe: false,
      error: null,
      register:  async (payload) => {
        try {
          set({
            isLoading: true,
            error: null
          });
           const data = await registerRequest(payload);
           localStorage.setItem("token", data.token);
           set({
            user: data.user,
            token: data.token,
            isLoading: false,
          });
 
          return data;
        } catch (error) {
          set({
            error: error,
            isLoading: false,
          });
          throw error;
        }
      },

      login: async (payload, rememberMe) => {
        try {
          set({
            isLoading: true,
            error: null,
          });
            const data = await loginRequest(payload);
           localStorage.setItem("token", data.token);
          set({
            user: data.user,
            token: data.token,
            rememberMe: rememberMe,
            isLoading: false,
          });
          return data;
        } catch (error) {
           set({
            error: error.data.error,
            isLoading: false,
          });

          throw error;
        }
      },

      logout: () => {
         localStorage.clear();
        set({
          user: null,
          token: null,
          error: null,
        });
      },
      forgotPassword: async (email) => {
        try {
          set({
            isLoading: true,
            error: null,
          });

          const data = await forgotPasswordRequest(email);

          set({
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

      resetPassword: async (token, password) => {
        try {
          set({
            isLoading: true,
            error: null,
          });

          const data = await resetPasswordRequest(token, password);

          set({
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
    }),
    {
      name: "auth-storage"
    },
  ),
);
