import { Sort } from "@/components/client/Sort";
import { render, within } from "@testing-library/react";

describe("Sort", () => {
  let setSortBy: jest.Mock;

  beforeEach(() => {
    setSortBy = jest.fn();
  });

  describe("rendering", () => {
    it('shows "Ascending" when sortBy is asc', () => {
      const { container } = render(<Sort sortBy="asc" setSortBy={setSortBy} />);
      expect(within(container).getByText("Ascending")).toBeInTheDocument();
    });

    it('shows "Descending" when sortBy is desc', () => {
      const { container } = render(<Sort sortBy="desc" setSortBy={setSortBy} />);
      expect(within(container).getByText("Descending")).toBeInTheDocument();
    });

    it("renders a combobox (select trigger)", () => {
      const { container } = render(<Sort sortBy="asc" setSortBy={setSortBy} />);
      expect(within(container).getByRole("combobox")).toBeInTheDocument();
    });
  });
});
