import { join } from 'path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const envFilePath = join(
  __dirname,
  '..',
  '..',
  '..',
  'env',
  `.env.${process.env.NODE_ENV}`,
);
config({ path: envFilePath });

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '..', '..', 'models', '**', '*.entity{.ts,.js}')],
  migrations: [
    join(__dirname, '..', '..', 'database', 'pg', 'migrations', '*{.ts,.js}'),
  ],
  logging: true,
  logger: 'advanced-console',
});
