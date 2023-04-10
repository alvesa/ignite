import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';

let connection: Connection;
const adminEmail = 'admin@email.com';

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const adminPassword = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "is_admin", created_at, driver_license)
      VALUES ('${id}', 'admin', '${adminEmail}', '${adminPassword}', true, 'now()', 'XXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: adminEmail, password: 'admin' });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const categories = await request(app).get('/categories');

    expect(categories.status).toBe(200);
    expect(categories.body.length).toBe(1);
  });
});
