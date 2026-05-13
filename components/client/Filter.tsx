import { FilterType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Users</SelectItem>
        <SelectItem value="pending">Has Pending Todos</SelectItem>
        <SelectItem value="completed">All Todos Done</SelectItem>
      </SelectContent>
    </Select>
  );
};
