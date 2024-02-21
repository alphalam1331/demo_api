import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { BooksService } from './books.service';
import { CreateBookDto } from '../../models/book/create-book.dto';
import { UpdateBookDto } from '../../models/book/update-book.dto';
import { CreateReviewDto } from '../../models/review/create-review.dto';
import { UpdateReviewDto } from '../../models/review/update-review.dto';

import { Book } from 'src/models/book/book.entity';
import { Review } from 'src/models/review/review.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  findAllBook(): Promise<Book[]> {
    return this.booksService.findAllBook();
  }

  @Get(':id')
  findBookById(
    @Param('id') id: string,
    @Query('withReviews') withReviews: boolean,
  ): Promise<Book> {
    return this.booksService.findBookById(id, withReviews);
  }

  @Patch(':id')
  updateBookDetails(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return this.booksService.updateBookDetails(id, updateBookDto);
  }

  @Post(':id/review')
  addReview(
    @Param('id') bookId: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.booksService.addReview(bookId, createReviewDto);
  }

  @Patch('/review/:review_id')
  updateReview(
    @Param('review_id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<UpdateResult> {
    return this.booksService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  removeBook(@Param('id') id: string): Promise<DeleteResult> {
    return this.booksService.removeBook(id);
  }
}
