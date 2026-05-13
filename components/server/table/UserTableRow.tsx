"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export const UserTableRow = ({ user }: { user: User }) => {
  const router = useRouter();
  const {
    name,
    email,
    username,
    id,
    totalPosts,
    pendingTodos,
    completedTodos,
  } = user;

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted"
      onClick={() => router.push(`/users/${id}`)}
    >
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{`Post: ${totalPosts}, pending Todo: ${pendingTodos}, completed Todo: ${completedTodos}`}</TableCell>
    </TableRow>
  );
};
