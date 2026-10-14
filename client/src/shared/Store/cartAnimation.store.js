
import { create } from "zustand";

const useCartAnimationStore = create((set) => ({
  animationKey: 0,
  animation: null,

  triggerAnimation: ({ image, startRect, endRect }) =>
    set((state) => ({
      animationKey: state.animationKey + 1,
      animation: {
        image,
        startRect: {
          left: startRect.left,
          top: startRect.top,
          width: startRect.width,
          height: startRect.height,
        },
        endRect: {
          left: endRect.left,
          top: endRect.top,
          width: endRect.width,
          height: endRect.height,
        },
      },
    })),

  clearAnimation: () => set({ animation: null }),
}));

export default useCartAnimationStore;
