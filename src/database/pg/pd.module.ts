import { join } from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const pgModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('pg.host'),
    port: +configService.get('pg.port'),
    username: configService.get('pg.user'),
    password: configService.get('pg.password'),
    database: configService.get('pg.db'),
    entities: [join(__dirname, '..', '..', 'models', '**', '*.entity.{ts|js}')],
    autoLoadEntities: true,
    synchronize: true,
    logger: 'advanced-console',
    logging: true,
  }),
  inject: [ConfigService],
});
