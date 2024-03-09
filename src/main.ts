import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('port');
  const pgHost = configService.get('pg.host');
  const pgPort = configService.get('pg.port');

  await app.listen(port);

  Logger.log(`Version: 2`, 'Server Info');
  Logger.log(`Listening on port:${port}`, 'Server Info');
  Logger.log(`Postgres server: http://${pgHost}:${pgPort}`, 'Server Info');
}

bootstrap();
