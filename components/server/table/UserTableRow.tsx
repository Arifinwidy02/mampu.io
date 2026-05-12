import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/types";

export const UserTableRow = ({user}: {user: User}) => {
    const {name, email, username} = user;
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{username}</TableCell>
    </TableRow>
  );
};