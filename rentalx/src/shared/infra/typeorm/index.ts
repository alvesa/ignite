import { Connection, createConnection } from 'typeorm';
import { getConnectionOptions } from 'typeorm/globals';

export default async (host = 'database_ignite'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentalx_test'
          : defaultOptions.database,
    })
  );
};
