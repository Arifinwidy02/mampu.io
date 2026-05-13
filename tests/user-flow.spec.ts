import { test, expect } from "@playwright/test";

test.describe("User Management Flow", () => {
  test("should navigate from list to details and back", async ({ page }) => {
    await page.goto("/users");

    const table = page.locator("table");
    await expect(table).toBeVisible();

    const searchInput = page.getByPlaceholder(/search by name/i);
    await searchInput.fill("Ervin Howell");

    await expect(
      page.getByRole("cell", { name: "Ervin Howell" }),
    ).toBeVisible();

    await page.getByRole("cell", { name: "Ervin Howell" }).click();

    await expect(page).toHaveURL(/\/users\/2/);
    await expect(page.getByText("Antonette")).toBeVisible();
    await expect(page.getByText("shanna@melissa.tv")).toBeVisible();

    await expect(page.getByText(/User Activity/i)).toBeVisible();

    await page.getByRole("button", { name: /back to list/i }).click();
    await expect(page).toHaveURL(/\/users/);
  });

  test("should show empty state on non-existent search", async ({ page }) => {
    await page.goto("/users");
    await page.getByPlaceholder(/search by name/i).fill("NamaNgawur123");

    await expect(page.getByText(/no users found/i)).toBeVisible();
  });
});
