import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from '../../models/book/book.entity';
import { Review } from '../../models/review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Review])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
