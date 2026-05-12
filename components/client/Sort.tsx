"use client";

import { SortOrder } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={4}
        style={{ marginLeft: 38 }}
      >
        <SelectItem value="asc">Ascending</SelectItem>
        <SelectItem value="desc">Descending</SelectItem>
      </SelectContent>
    </Select>
  );
};
