import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserDetailClient from "@/features/users/UserDetailClient";
import { mockUser } from "../constant";

const mockBack = jest.fn();
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack, push: mockPush, replace: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

const mockFetchUserDetails = jest.fn();
jest.mock("@/services/api", () => ({
  fetchUsers: jest.fn(),
  fetchUserDetails: () => mockFetchUserDetails(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

describe("UserDetailClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loading state", () => {
    it("shows skeleton while loading", () => {
      mockFetchUserDetails.mockReturnValue(new Promise(() => {}));
      render(<UserDetailClient id="1" />, { wrapper });
      expect(screen.getByText("Back to list")).toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("shows error lottie with retry button on fetch failure", async () => {
      mockFetchUserDetails.mockRejectedValue(new Error("Not found"));
      render(<UserDetailClient id="1" />, { wrapper });
      await waitFor(() => {
        expect(
          screen.getByText("Failed to load user details. Please try again."),
        ).toBeInTheDocument();
      });
      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });

    it("shows error state when user is null", async () => {
      mockFetchUserDetails.mockResolvedValue(null);
      render(<UserDetailClient id="999" />, { wrapper });
      await waitFor(() => {
        expect(
          screen.getByText("Failed to load user details. Please try again."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("rendering user details", () => {
    beforeEach(async () => {
      mockFetchUserDetails.mockResolvedValue(mockUser);
      render(<UserDetailClient id="1" />, { wrapper });
      await waitFor(() =>
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument(),
      );
    });

    it("shows user name and username in card header", () => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      expect(screen.getByText("(@Bret)")).toBeInTheDocument();
    });
  });
});
