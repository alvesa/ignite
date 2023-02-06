import { createConnection } from 'typeorm';
import { getConnectionOptions } from 'typeorm/globals';

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = 'database_ignite';
  createConnection({
    ...options,
  });
});
// createConnection();
