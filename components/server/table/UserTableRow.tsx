"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/types";
import { MessageSquare, Clock, CheckCircle2 } from "lucide-react";
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
      <TableCell>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <MessageSquare className="h-3 w-3" />
            {totalPosts}
          </Badge>
          <Badge variant={pendingTodos > 0 ? "destructive" : "outline"}>
            <Clock className="h-3 w-3" />
            {pendingTodos}
          </Badge>
          <Badge variant="outline">
            <CheckCircle2 className="h-3 w-3" style={{ color: "green" }} />
            {completedTodos}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
};
