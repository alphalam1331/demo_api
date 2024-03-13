import { registerAs } from '@nestjs/config';

interface AppConfig {
  port: number;
}
interface PGConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  db: string;
}

export const appConfig = (): AppConfig => ({
  port: +process.env.PORT,
});

export const pgConfig = registerAs(
  'pg',
  (): PGConfig => ({
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  }),
);
