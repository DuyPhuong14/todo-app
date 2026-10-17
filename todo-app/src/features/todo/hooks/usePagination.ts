import { useState } from "react";

export function usePagination<T>(items: T[], pageSize = 5) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  // Kẹp lại: xóa task cuối của trang cuối thì tự lùi về trang trước
  const currentPage = Math.min(page, totalPages);

  const pagedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return { page: currentPage, setPage, totalPages, pagedItems };
}