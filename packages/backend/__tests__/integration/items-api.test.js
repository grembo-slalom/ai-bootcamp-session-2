const request = require('supertest');
const { app, db } = require('../../src/app');

afterAll(() => {
  if (db) {
    db.close();
  }
});

const createItem = async (name = 'Temp Item') => {
  const response = await request(app)
    .post('/api/items')
    .send({ name })
    .set('Accept', 'application/json');

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('id');
  return response.body;
};

describe('GET /', () => {
  it('should return health check status', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });
});

describe('GET /api/items', () => {
  it('should return all items with expected fields', async () => {
    const response = await request(app).get('/api/items');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const item = response.body[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('completed');
    expect(item).toHaveProperty('created_at');
  });
});

describe('POST /api/items', () => {
  it('should create a new item with completed defaulting to 0', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Item');
    expect(response.body.completed).toBe(0);
    expect(response.body).toHaveProperty('created_at');
  });

  it('should return 400 if name is missing', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({})
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Item name is required');
  });

  it('should return 400 if name is empty', async () => {
    const response = await request(app)
      .post('/api/items')
      .send({ name: '' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Item name is required');
  });
});

describe('PATCH /api/items/:id', () => {
  it('should toggle an item from incomplete to complete', async () => {
    const item = await createItem('Item to complete');
    expect(item.completed).toBe(0);

    const response = await request(app).patch(`/api/items/${item.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(item.id);
    expect(response.body.completed).toBe(1);
  });

  it('should toggle an item back from complete to incomplete', async () => {
    const item = await createItem('Item to toggle twice');

    await request(app).patch(`/api/items/${item.id}`);
    const response = await request(app).patch(`/api/items/${item.id}`);

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(0);
  });

  it('should return 404 when item does not exist', async () => {
    const response = await request(app).patch('/api/items/999999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Item not found');
  });

  it('should return 400 for an invalid id', async () => {
    const response = await request(app).patch('/api/items/abc');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Valid item ID is required');
  });
});

describe('DELETE /api/items/:id', () => {
  it('should delete an existing item', async () => {
    const item = await createItem('Item To Be Deleted');

    const deleteResponse = await request(app).delete(`/api/items/${item.id}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toEqual({ message: 'Item deleted successfully', id: item.id });

    const deleteAgain = await request(app).delete(`/api/items/${item.id}`);
    expect(deleteAgain.status).toBe(404);
    expect(deleteAgain.body).toHaveProperty('error', 'Item not found');
  });

  it('should return 404 when item does not exist', async () => {
    const response = await request(app).delete('/api/items/999999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Item not found');
  });

  it('should return 400 for an invalid id', async () => {
    const response = await request(app).delete('/api/items/abc');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Valid item ID is required');
  });
});
