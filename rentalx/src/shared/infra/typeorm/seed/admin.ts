import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuidV4();
  const password = await hash('admin', 8);
  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license ,created_at)
    VALUES ('${id}', 'admin', 'admin@local.com', '${password}', true, 'XXX-XXXX', now())`
  );

  await connection.close();
}

create().then((x) => console.log('User admin created'));
