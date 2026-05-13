import { Sort } from "@/components/client/Sort";
import { render, screen } from "@testing-library/react";

describe("Sort", () => {
  let setSortBy: jest.Mock;

  beforeEach(() => {
    setSortBy = jest.fn();
  });

  describe("rendering", () => {
    it('shows "Ascending" when sortBy is asc', () => {
      render(<Sort sortBy="asc" setSortBy={setSortBy} />);
      expect(screen.getByText("Ascending")).toBeInTheDocument();
    });

    it('shows "Descending" when sortBy is desc', () => {
      render(<Sort sortBy="desc" setSortBy={setSortBy} />);
      expect(screen.getByText("Descending")).toBeInTheDocument();
    });

    it("renders a combobox (select trigger)", () => {
      render(<Sort sortBy="asc" setSortBy={setSortBy} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
});
