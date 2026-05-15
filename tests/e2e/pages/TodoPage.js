const { expect } = require('@playwright/test');

class TodoPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Enter item name');
    this.addButton = page.getByRole('button', { name: 'Add Item' });
    this.itemList = page.getByRole('list');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async addItem(name) {
    await this.nameInput.fill(name);
    await this.addButton.click();
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async deleteItem(name) {
    const item = this.page.locator('li').filter({ hasText: name });
    await item.getByRole('button', { name: 'Delete' }).click();
    await expect(this.page.getByText(name)).not.toBeVisible();
  }

  async toggleItem(name) {
    const item = this.page.locator('li').filter({ hasText: name });
    await item.getByRole('checkbox').click();
  }

  async isItemCompleted(name) {
    const item = this.page.locator('li').filter({ hasText: name });
    return item.getByRole('checkbox').isChecked();
  }

  async getItems() {
    await expect(this.itemList).toBeVisible();
    return this.page.locator('li').all();
  }

  waitForItems() {
    return expect(this.itemList).toBeVisible();
  }
}

module.exports = { TodoPage };
