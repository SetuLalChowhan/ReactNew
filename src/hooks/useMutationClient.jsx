/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useDispatch } from "react-redux";
import {
  setResetToken,
  setApiError as setUiApiError,
} from "@/redux/slices/uiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { useUserProfile } from "./fetchUserProfile";

const useMutationClient = ({
  url,
  method = "post",
  isPrivate = false,
  invalidateKeys = [],
  successMessage = "Success",
  errorMessage,
  redirectTo,
  onSuccess,
  onError,
  isLogin = false,
  resetFunction,
  setImages,
  externalErrorSetter,
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();
  const navigate = useNavigate();

  const setApiError = (error) => {
    if (externalErrorSetter) {
      externalErrorSetter(error);
    } else {
      dispatch(setUiApiError(error));
    }
  };

  return useMutation({
    mutationFn: async ({ data, config }) => {
      setApiError(null);
      if (method === "delete") {
        return await client.delete(url, config);
      }
      return await client[method](url, data, config);
    },

    onSuccess: (res) => {
      const data = res?.data || res;

      toast.success(data?.message || successMessage);

      // � login handling
      if (isLogin) {
        const token = data.token || data.access_token;
        const user = data.userData || data.user;

        if (token) {
          dispatch(setCredentials({ token, user }));
        }
      }

      // �🔁 password reset handling

      if (data?.resetKey) {
        dispatch(setResetToken(data.resetKey));
      }

      // ♻️ invalidate queries
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      if (redirectTo) navigate(redirectTo);

      setApiError(null);
      resetFunction?.();
      setImages?.([]);

      onSuccess?.(data);
    },

    onError: (error) => {
      const responseData = error?.response?.data;
      let messages = [];

      if (responseData?.errors) {
        messages = Object.values(responseData.errors).flat();
      } else {
        messages = [
          responseData?.message ||
            errorMessage ||
            error?.message ||
            "Something went wrong",
        ];
      }

      setApiError(messages);
      onError?.(error);
    },
  });
};

export default useMutationClient;

// const loginMutation = useMutationClient({ // url: "/auth/login", // method: "post", // isPrivate: false, // isLogin: true, // redirectTo: "/dashboard", // successMessage: "Login successful", // });
