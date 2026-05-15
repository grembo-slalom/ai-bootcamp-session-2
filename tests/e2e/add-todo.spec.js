const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('Add TODO item', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test.afterEach(async () => {
    await todoPage.cleanupItem('Buy groceries');
    await todoPage.cleanupItem('Read a book');
  });

  test('should add a new item and display it in the list', async () => {
    await todoPage.addItem('Buy groceries');
    const items = await todoPage.getItems();
    const names = await Promise.all(items.map(i => i.textContent()));
    expect(names.some(n => n.includes('Buy groceries'))).toBe(true);
  });

  test('should clear the input after adding an item', async ({ page }) => {
    await todoPage.addItem('Read a book');
    await expect(todoPage.nameInput).toHaveValue('');
  });

  test('should not add an item when input is empty', async ({ page }) => {
    const countBefore = (await todoPage.getItems()).length;
    await todoPage.addButton.click();
    const countAfter = (await todoPage.getItems()).length;
    expect(countAfter).toBe(countBefore);
  });
});
