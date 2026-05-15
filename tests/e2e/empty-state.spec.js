const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('Empty state', () => {
  test('should display the empty state message when no items exist', async ({ page }) => {
    // Intercept GET /api/items to return an empty list
    await page.route('**/api/items', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      } else {
        await route.continue();
      }
    });

    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await expect(page.getByText('No items found. Add some!')).toBeVisible();
  });
});
