import { renderHook } from "@testing-library/react";
import { usePagination } from "@/hooks/use-pagination";

const buildData = (n: number) =>
  Array.from({ length: n }, (_, i) => `item-${i + 1}`);

describe("usePagination", () => {
  describe("edge cases", () => {
    it("handles empty array", () => {
      const { result } = renderHook(() => usePagination([], 5));
      expect(result.current.paginatedData).toEqual([]);
      expect(result.current.totalPages).toBe(1);
    });

    it("uses default pageSize 5", () => {
      const { result } = renderHook(() => usePagination(buildData(12)));
      expect(result.current.paginatedData).toHaveLength(5);
      expect(result.current.totalPages).toBe(3);
    });

    it("handles custom pageSize", () => {
      const { result } = renderHook(() => usePagination(buildData(10), 3));
      expect(result.current.paginatedData).toHaveLength(3);
      expect(result.current.totalPages).toBe(4);
    });

    it("handles data length of 1", () => {
      const { result } = renderHook(() => usePagination(["solo"], 5));
      expect(result.current.paginatedData).toEqual(["solo"]);
      expect(result.current.totalPages).toBe(1);
    });
  });
});
