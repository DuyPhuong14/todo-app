import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { StatusFilter } from "../types";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
}

const OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Chưa xong" },
  { value: "done", label: "Đã xong" },
];

export function TodoToolbar({ search, onSearchChange, status, onStatusChange }: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Input
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="flex gap-1">
        {OPTIONS.map((o) => (
          <Button
            key={o.value}
            size="sm"
            variant={status === o.value ? "default" : "outline"}
            onClick={() => onStatusChange(o.value)}
          >
            {o.label}
          </Button>
        ))}
      </div>
    </div>
  );
}