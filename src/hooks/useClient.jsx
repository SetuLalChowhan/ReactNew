/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useClient = ({
  queryKey,
  url,
  isPrivate = false,
  params = {},
  enabled = true,
  initialData,
}) => {
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();

  const query = useQuery({
    // include params so refetch happens automatically on change
    queryKey: [...queryKey, params],
    queryFn: async () => {
      const res = await client.get(url, { params });
      return res.data;
    },
    initialData,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useClient;
//   const { data, isLoading, isError } = useClient({
//     queryKey: ["products" ],
//     url: "/products",
//   });
