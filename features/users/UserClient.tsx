"use client";

import { Sort } from "@/components/client/Sort";
import { UserTableRow } from "@/components/server/table/UserTableRow";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/use-users";
import { SortOrder, User } from "@/types";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const UserClient = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState<SortOrder>("asc");
  const { data: users, isLoading, isError } = useUsers();
  const tableHeader = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "username", label: "Username" },
  ];

  const processedUsers = useMemo(() => {
    if (!users) return [];
    return users
      .filter(
        ({ name, email }: User) =>
          name?.toLowerCase().includes(debouncedSearch?.toLowerCase()) ||
          email?.toLowerCase().includes(debouncedSearch?.toLowerCase()),
      )
      .sort((a: User, b: User) => {
        if (sortBy === "asc") return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
  }, [search, sortBy, users]);

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div className="container mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">User Operations</h1>
      <div className="flex items-center gap-2 flex-row">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Sort sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              {tableHeader?.map((header) => (
                <TableHead key={header.key}>{header.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedUsers?.map((user: User) => (
              <UserTableRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
        {processedUsers?.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};
