import { registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

interface PGConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  db: string;
}

export default registerAs('pg', (): PGConfig => {
  return {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  };
});

export const PGModule = TypeOrmModule.forRootAsync({});
