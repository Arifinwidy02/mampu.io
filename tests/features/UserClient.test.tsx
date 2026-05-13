import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserClient } from "@/features/users/UserClient";
import { mockUsersArray } from "../constant";

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: jest.fn(), back: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("use-debounce", () => ({
  useDebounce: (value: string) => [value],
}));

const mockFetchUsers = jest.fn();
jest.mock("@/services/api", () => ({
  fetchUsers: () => mockFetchUsers(),
  fetchUserDetails: jest.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

describe("UserClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loading state", () => {
    it("shows table skeleton while loading", () => {
      mockFetchUsers.mockReturnValue(new Promise(() => {}));
      render(<UserClient />, { wrapper });
      expect(screen.getByText("User List")).toBeInTheDocument();
      expect(document.querySelector("[data-slot='table']")).toBeInTheDocument();
      expect(
        document.querySelector("[data-slot='skeleton']"),
      ).toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("shows error lottie with retry button", async () => {
      mockFetchUsers.mockRejectedValue(new Error("Network error"));
      render(<UserClient />, { wrapper });
      await waitFor(() => {
        expect(
          screen.getByText("Failed to load users. Please try again."),
        ).toBeInTheDocument();
      });
      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("shows empty lottie when no users match search", async () => {
      mockFetchUsers.mockResolvedValue(mockUsersArray);
      render(<UserClient />, { wrapper });
      await waitFor(() => {
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      });
      await userEvent.type(
        screen.getByPlaceholderText("Search by name or email..."),
        "zzzzzz",
      );
      await waitFor(() => {
        expect(
          screen.getByText('No users found for "zzzzzz"'),
        ).toBeInTheDocument();
      });
    });

    it("shows generic empty when no search term", async () => {
      mockFetchUsers.mockResolvedValue([]);
      render(<UserClient />, { wrapper });
      await waitFor(() => {
        expect(screen.getByText("No users found")).toBeInTheDocument();
      });
    });
  });

  describe("rendering users", () => {
    it("renders table headers", async () => {
      mockFetchUsers.mockResolvedValue(mockUsersArray);
      render(<UserClient />, { wrapper });
      await waitFor(() =>
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument(),
      );
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Activity")).toBeInTheDocument();
    });
  });

  describe("search filter", () => {
    it("filters users by name", async () => {
      mockFetchUsers.mockResolvedValue(mockUsersArray);
      render(<UserClient />, { wrapper });
      await waitFor(() =>
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument(),
      );
      await userEvent.type(
        screen.getByPlaceholderText("Search by name or email..."),
        "Ervin",
      );
      await waitFor(() => {
        expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
        expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
      });
    });
  });

  describe("sort", () => {
    it("sorts by name descending", async () => {
      mockFetchUsers.mockResolvedValue(mockUsersArray);
      render(<UserClient />, { wrapper });
      await waitFor(() =>
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument(),
      );
      const comboboxes = screen.getAllByRole("combobox");
      const sortCombobox = comboboxes[0];
      await userEvent.click(sortCombobox);
      await userEvent.click(screen.getByText("Descending"));
      await waitFor(() => {
        const rows = screen.getAllByRole("row");
        expect(rows[1]).toHaveTextContent("Leanne Graham");
        expect(rows[2]).toHaveTextContent("Ervin Howell");
        expect(rows[3]).toHaveTextContent("Clementine Bauch");
      });
    });
  });
});
