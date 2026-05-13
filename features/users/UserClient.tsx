"use client";

import { Filter } from "@/components/client/Filter";
import LottieState from "@/components/client/LottieState";
import { Sort } from "@/components/client/Sort";
import { TableSkeleton } from "@/components/client/TableSkeleton";
import { UserTableRow } from "@/components/server/table/UserTableRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/use-users";
import { usePagination } from "@/hooks/use-pagination";
import { FilterType, SortOrder, User } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const UserClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState<SortOrder>(
    (searchParams.get("sort") as SortOrder) || "asc",
  );
  const [statusFilter, setStatusFilter] = useState<FilterType>(
    (searchParams.get("filter") as FilterType) || "all",
  );

  const { data: users, isLoading, isError, refetch } = useUsers();
  const tableHeader = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "username", label: "Username" },
    { key: "activity", label: "Activity" },
  ];

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
  }, [debouncedSearch, sortBy, users, statusFilter]);

  const {
    paginatedData: paginatedUsers,
    totalPages,
    page,
    setPage,
  } = usePagination(processedUsers, 5);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sortBy !== "asc") params.set("sort", sortBy);
    if (statusFilter !== "all") params.set("filter", statusFilter);
    const queryString = params.toString();
    router.replace(queryString ? `/users?${queryString}` : "/users");
  }, [debouncedSearch, sortBy, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, statusFilter]);

  if (isError)
    return (
      <div className="container mx-auto py-10">
        <LottieState
          src="/lottie/empty_state.json"
          description="Failed to load users. Please try again."
        >
          <Button onClick={() => refetch()}>Try Again</Button>
        </LottieState>
      </div>
    );

  return (
    <div className="container mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">User List</h1>
      <div className="flex items-center gap-2 flex-row flex-wrap">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-8"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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
        <>
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
                {paginatedUsers?.map((user: User) => (
                  <UserTableRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
