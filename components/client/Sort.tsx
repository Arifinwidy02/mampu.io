"use client";

import { SortOrder } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowUpDown } from "lucide-react";

export const Sort = ({
  sortBy,
  setSortBy,
}: {
  sortBy: SortOrder;
  setSortBy: (value: SortOrder) => void;
}) => {
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger>
        <ArrowUpDown className="h-4 w-4 mr-2 shrink-0 text-muted-foreground" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={4}>
        <SelectItem value="asc">Ascending</SelectItem>
        <SelectItem value="desc">Descending</SelectItem>
      </SelectContent>
    </Select>
  );
};
