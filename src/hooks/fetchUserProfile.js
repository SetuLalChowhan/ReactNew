import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/slices/authSlice"; 

export const useUserProfile = () => {
  const token = useSelector(selectCurrentToken);

  return useQuery({
    queryKey: ["userProfile", token], // Re-fetches if token changes
    queryFn: async () => {
      if (!token) return null;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.userdata || res.data;
    },
    enabled: !!token, // Don't run the query if there is no token
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 mins
  });
};
// const { data: user, isLoading, error, refetch } = useUserProfile();
