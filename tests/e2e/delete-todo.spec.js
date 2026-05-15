const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('Delete TODO item', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addItem('Item to delete');
  });

  test.afterEach(async () => {
    await todoPage.cleanupItem('Item to delete');
    await todoPage.cleanupItem('Item to keep');
  });

  test('should remove the item from the list after deletion', async ({ page }) => {
    await todoPage.deleteItem('Item to delete');
    await expect(page.getByText('Item to delete')).not.toBeVisible();
  });

  test('should keep other items intact after deletion', async ({ page }) => {
    await todoPage.addItem('Item to keep');
    await todoPage.deleteItem('Item to delete');
    await expect(page.getByText('Item to keep')).toBeVisible();
  });
});
