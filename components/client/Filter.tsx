"use client";

import { FilterType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ListFilter } from "lucide-react";

export const Filter = ({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: FilterType;
  setStatusFilter: (value: FilterType) => void;
}) => {
  return (
    <Select value={statusFilter} onValueChange={setStatusFilter}>
      <SelectTrigger className="w-[200px]">
        <ListFilter className="h-4 w-4 mr-2 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={4}>
        <SelectItem value="all">All Users</SelectItem>
        <SelectItem value="pending">Has Pending Todos</SelectItem>
        <SelectItem value="completed">All Todos Done</SelectItem>
      </SelectContent>
    </Select>
  );
};
