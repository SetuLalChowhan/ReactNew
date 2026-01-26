import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-toastify";

const useMutationClient = ({
  url,
  method = "post",
  isPrivate = false,
  invalidateKeys = [],
  successMessage = "Success",
  redirectTo,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();

  return useMutation({
    mutationFn: async ({ data, config } = {}) => {
      if (method === "delete") return await client.delete(url, config);
      return await client[method](url, data, config);
    },

    onSuccess: (res) => {
      const data = res?.data || res;
      toast.success(data?.message || successMessage);

      // ♻️ Invalidate related queries
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      if (redirectTo) navigate(redirectTo);
    },

    onError: (error) => {
      const msg = error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(msg);
    },
  });
};

export default useMutationClient;


// const { mutate } = useMutationClient({
//   url: "/auth/login",
//   redirectTo: "/dashboard"
// });

// const handleLogin = (formData) => {
//   mutate({ data: formData }, {
//     onSuccess: (res) => {
//       // Handle your Redux logic here if needed
//       dispatch(setToken(res.data.token));
//     },
//     onError: (err) => {
//       // Handle specific field errors here
//       const serverErrors = err?.response?.data?.errors;
//       setMyLocalErrorState(serverErrors);
//     }
//   });
// };