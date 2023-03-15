import { Connection, createConnection } from 'typeorm';
import { getConnectionOptions } from 'typeorm/globals';

export default async (host = 'database_ignite'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
