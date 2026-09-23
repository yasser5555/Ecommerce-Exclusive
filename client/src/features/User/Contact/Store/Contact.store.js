import { create } from "zustand";
import { sendContactMessage } from "../Api/Contact.api";

export const useContactStore = create((set) => ({
  loading: false,
  success: false,
  error: null,

  sendMessage: async (contactData) => {
    try {
      set({
        loading: true,
        success: false,
        error: null,
      });

      await sendContactMessage(contactData);

      set({
        loading: false,
        success: true,
      });

      return true;
    } catch (error) {
      set({
        loading: false,
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to send message",
      });

      return false;
    }
  },

  resetContactState: () => {
    set({
      loading: false,
      success: false,
      error: null,
    });
  },
}));