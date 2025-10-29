import { create } from "zustand";
import { secureGet, secureSet, secureRemove } from "@/utils/secure";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set, get) => ({
  user: secureGet("user") || null,
  token: secureGet("accessToken") || null,
  kyc: secureGet("kyc") || null,
  loading: false,

  saveAuthData: (accessToken, userData) => {
    set({ user: userData, token: accessToken });
    secureSet("accessToken", accessToken);
    secureSet("user", userData);
  },

  logout: () => {
    set({ user: null, token: null, kyc: null });
    secureRemove("accessToken");
    secureRemove("user");
    secureRemove("kyc");
    toast.success("Logged out successfully");
  },

  fetchUser: async (accessToken) => {
    if (!accessToken) return;
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      secureSet("user", user);
    } catch (err) {
      console.error("Failed to fetch user", err);
    } finally {
      set({ loading: false });
    }
  },
}));

// Optional: auto-fetch user on app start
const { token, fetchUser } = useAuthStore.getState();
if (token) fetchUser(token);
