"use client";

import { Filter } from "@/components/client/Filter";
import LottieState from "@/components/client/LottieState";
import { Sort } from "@/components/client/Sort";
import { TableSkeleton } from "@/components/client/TableSkeleton";
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
import { FilterType, SortOrder, User } from "@/types";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const UserClient = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState<SortOrder>("asc");
  const [statusFilter, setStatusFilter] = useState<FilterType>("all");

  const { data: users, isLoading, isError } = useUsers();
  const tableHeader = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "username", label: "Username" },
    { key: "activity", label: "Activity (Posts / Pending)" },
  ];
  console.log("🚀 ~ UserClient ~ users:", users);

  const processedUsers = useMemo(() => {
    if (!users) return [];
    return users
      .filter(({ name, email, pendingTodos }: User) => {
        const matchesSearch =
          name?.toLowerCase().includes(debouncedSearch?.toLowerCase()) ||
          email?.toLowerCase().includes(debouncedSearch?.toLowerCase());

        if (statusFilter === "pending")
          return matchesSearch && pendingTodos > 0;
        if (statusFilter === "completed")
          return matchesSearch && pendingTodos === 0;

        return matchesSearch;
      })
      .sort((a: User, b: User) => {
        if (sortBy === "asc") return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
  }, [search, sortBy, users, statusFilter]);

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
        <Filter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>
      {isLoading ? (
        <TableSkeleton columns={4} rows={5} />
      ) : processedUsers?.length === 0 ? (
        <LottieState
          src="/lottie/empty_state.json"
          description={
            debouncedSearch
              ? `No users found for "${debouncedSearch}"`
              : "No users found"
          }
        />
      ) : (
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
        </div>
      )}
    </div>
  );
};
