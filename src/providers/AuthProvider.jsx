import React, { createContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "@/context";
import { secureGet, secureRemove, secureSet } from "../utils/secure";

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Initialize token from secure storage
  const [token, setToken] = useState(secureGet("access_token"));
  const [user, setUser] = useState(secureGet("user"));
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  // Function to save token securely
  const saveToken = (newToken) => {
    if (newToken) {
      secureSet("access_token", newToken);
      setToken(newToken);
    }
  };

  // Function to remove token securely
  const removeAuth = () => {
    secureRemove("access_token");
    secureRemove("user");
    setToken(null);
    setUser(null);
  };

  // TanStack Query for Profile
  const {
    data: userdata,
    refetch: userRefetch,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["userProfile", token], // dependency on token
    queryFn: async () => {
      // If no token, don't even try to fetch
      if (!token) return null;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        secureSet("user", res.data.userdata);
        return res.data.userdata;
      } catch (error) {
        // If 401, it means token is invalid/expired
        if (error.response && error.response.status === 401) {
          removeAuth();
          setUser(null);
        }
        throw error;
      }
    },
    enabled: !!token, // Only run if token exists
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Sync the local state 'user' whenever 'userdata' changes
  // We also make sure the user object includes the token so useAxiosSecure works
  useEffect(() => {
    if (userdata) {
      setUser({ ...userdata });
    } else if (!token) {
      setUser(null);
    }
  }, [userdata, token]);

  // Logout Function
  const logout = async () => {
    setIsLogoutLoading(true);
    try {
      // Optional: Call backend logout if needed, though usually just clearing token is enough for JWT
      // But keeping it if you need server-side cookie cleanup
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (e) {
        console.error("Backend logout error", e);
      }

      // Clear the query cache
      queryClient.removeQueries({ queryKey: ["userProfile"] });

      // Remove token and reset state
      removeAuth();
      setUser(null);

      toast.success("Logout successful");
      navigate("/auth/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const contextValue = {
    userdata,
    user,
    token,
    saveToken, // Expose saveToken for Login page to use
    setUser,
    userRefetch,
    isLoading,
    isFetching,
    logout,
    isLogoutLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
