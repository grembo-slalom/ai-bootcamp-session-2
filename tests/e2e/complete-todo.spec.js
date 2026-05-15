const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('Complete TODO item', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addItem('Task to complete');
  });

  test('should mark an item as complete when checkbox is clicked', async () => {
    await todoPage.toggleItem('Task to complete');
    expect(await todoPage.isItemCompleted('Task to complete')).toBe(true);
  });

  test('should mark a completed item as incomplete when checkbox is clicked again', async () => {
    await todoPage.toggleItem('Task to complete');
    await todoPage.toggleItem('Task to complete');
    expect(await todoPage.isItemCompleted('Task to complete')).toBe(false);
  });

  test('should apply completed styling to a finished item', async ({ page }) => {
    await todoPage.toggleItem('Task to complete');
    const item = page.locator('li').filter({ hasText: 'Task to complete' });
    await expect(item).toHaveClass(/completed/);
  });
});
