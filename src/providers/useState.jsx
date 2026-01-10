import { create } from "zustand";

export const useValueStore = create((set) => ({
  resetToken: null,
  setResetToken: (token) => set({ resetToken: token }),
  apiError: null,
  setApiError: (error) => set({ apiError: error }),
}));
