import { useMemo, useState } from "react";

export function usePagination<T>(data: T[], pageSize = 5) {
  const [page, setPage] = useState(1);

  const result = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    return { paginatedData, totalPages };
  }, [data, page, pageSize]);

  return {
    ...result,
    page,
    setPage,
    pageSize,
  };
}
