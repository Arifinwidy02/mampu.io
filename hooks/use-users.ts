import { fetchUserDetails, fetchUsers } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUserDetails(userId),
    staleTime: 60 * 1000,
  });
};
