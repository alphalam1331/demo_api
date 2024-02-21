import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import configModule from './config.module';
import { customLogger } from '../core/helpers/custom-logger';
import { pgModule } from '../database/pg/pd.module';

@Module({
  imports: [configModule, pgModule, BooksModule, AuthorsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(customLogger).forRoutes('*');
  }
}
