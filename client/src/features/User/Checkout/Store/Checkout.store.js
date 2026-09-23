import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      paymentMethod: null,
      shippingMethod: "",
      selectedCard: null,
      selectedAddress: null,

      setPayment: (payload) => {
        set({
          paymentMethod: payload,
        });
      },

      setShipping: (payload) => {
        set({
          shippingMethod: payload,
        });
      },

      setselectedCard: (payload) => {
        set({
          selectedCard: payload,
        });
      },

      setselectedAddress: (payload) => {
        set({
          selectedAddress: payload,
        });
      },
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);