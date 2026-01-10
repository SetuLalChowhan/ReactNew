import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/slices/authSlice";

const useAxiosSecure = () => {
  const token = useSelector(selectCurrentToken);
  const access_token = token;

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
  });

  axiosSecure.interceptors.request.use((config) => {
    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
