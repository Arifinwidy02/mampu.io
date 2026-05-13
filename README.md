# mampu.io — User Management Dashboard

A Next.js application that displays a user management dashboard consuming the [JSONPlaceholder](https://jsonplaceholder.typicode.com) public REST API.

## Features

- **User list** with search (debounced), sort (asc/desc), filter (by todo status), and pagination
- **User detail** page with contact info, company/address, and tabbed posts & todos
- **Loading skeletons**, **error states** (with Lottie animation + retry), and **empty states**
- URL query parameter persistence (search, sort, filter survive page refresh)
- Responsive design (Tailwind CSS)
- Unit tests (Testing Library) and E2E tests (Playwright)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime | Bun |
| Language | TypeScript |
| UI | shadcn/ui (Radix primitives) + Tailwind CSS v4 |
| Data Fetching | TanStack React Query v5 |
| Animations | dotLottie (empty/error states) |
| Unit Tests | Bun test + Testing Library + JSDOM |
| E2E Tests | Playwright |
| Linting | ESLint |

## Getting Started

```bash
# Install dependencies
bun install

# Run development server (http://localhost:3000)
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Routes

| Route | Description |
|---|---|
| `/` | Redirects to `/users` |
| `/users` | User list dashboard |
| `/users/[id]` | User detail (ISR, revalidate = 60s) |

## Project Structure

```
├── app/                        # Next.js App Router pages & layouts
│   ├── layout.tsx              # Root layout (TanStack provider)
│   └── users/
│       ├── page.tsx            # /users
│       └── [id]/
│           ├── page.tsx        # /users/:id (server component, ISR)
│           └── error.tsx       # Error boundary
├── components/
│   ├── client/                 # Client components (Sort, Filter, LottieState, skeletons)
│   ├── server/                 # Server-compatible components (UserTableRow, SimpleCard)
│   └── ui/                     # shadcn/ui primitives
├── features/users/             # Feature-level components (UserClient, UserDetailClient)
├── hooks/                      # React Query hooks (useUsers, useUserDetails, usePagination)
├── services/                   # API layer (fetchUsers, fetchUserDetails)
├── providers/                  # TanStack QueryClientProvider
├── types/                      # TypeScript interfaces
├── lib/                        # Utility functions (cn, fluidClamp)
└── tests/                      # Unit & E2E tests
```

## Running Tests

### Unit Tests (Bun)

```bash
bun test
```

Runs 18 tests across 4 files using JSDOM. Each test file has its own JSDOM instance, cleaned up automatically between tests.

### E2E Tests (Playwright)

```bash
bunx playwright install chromium   # first time only
bunx playwright test
```

Runs 2 end-to-end tests against a local dev server (auto-started by Playwright).

## API Integration

Data is fetched from `https://jsonplaceholder.typicode.com`. The `fetchUsers` endpoint enriches users with computed fields (`totalPosts`, `completedTodos`, `pendingTodos`) by fetching and correlating `/users`, `/posts`, and `/todos` in parallel.

## State Management

| Concern | Approach |
|---|---|
| Server state | TanStack React Query (caching, retry, loading/error states) |
| URL state | `useSearchParams` + `router.replace` (search, sort, filter) |
| Local UI state | `useState` (tabs, pagination, input) |
| Debouncing | `useDebounce` (500ms on search input) |
