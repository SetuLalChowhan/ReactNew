import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slices/authSlice";
import { useMemo } from "react";

const useAxiosSecure = () => {
  const token = useSelector(selectCurrentToken);

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 30000,
    });

    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, [token]);

  return axiosSecure;
};

export default useAxiosSecure;
