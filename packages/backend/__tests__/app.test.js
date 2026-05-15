const { app, db } = require('../src/app');

afterAll(() => {
  if (db) {
    db.close();
  }
});

describe('app module', () => {
  it('should export an express app', () => {
    expect(app).toBeDefined();
    expect(typeof app).toBe('function');
  });

  it('should export a database instance', () => {
    expect(db).toBeDefined();
  });

  it('should have items table with correct schema', () => {
    const tableInfo = db.prepare("PRAGMA table_info(items)").all();
    const columns = tableInfo.map(col => col.name);
    expect(columns).toContain('id');
    expect(columns).toContain('name');
    expect(columns).toContain('completed');
    expect(columns).toContain('created_at');
  });

  it('should seed the database with initial items', () => {
    const items = db.prepare('SELECT * FROM items').all();
    expect(items.length).toBeGreaterThan(0);
  });

  it('should default completed to 0 for seeded items', () => {
    const items = db.prepare('SELECT * FROM items').all();
    items.forEach(item => {
      expect(item.completed).toBe(0);
    });
  });
});
