import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Book } from '../../models/book/book.entity';
import { CreateBookDto } from '../../models/book/create-book.dto';
import { UpdateBookDto } from '../../models/book/update-book.dto';
import { CreateReviewDto } from '../../models/review/create-review.dto';
import { Review } from '../../models/review/review.entity';
import { UpdateReviewDto } from '../../models/review/update-review.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book({ ...createBookDto });

    return await this.booksRepository.save(book);
  }

  async findAllBook(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findBookById(id: string, withReviews: boolean = false): Promise<Book> {
    const book = (
      await this.booksRepository.find({
        where: { id },
        relations: { reviews: Boolean(withReviews) },
      })
    )[0];

    if (!book) {
      throw new HttpException(`Cannot find book: ${id}`, HttpStatus.NOT_FOUND);
    } else {
      return book;
    }
  }

  async updateBookDetails(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    return await this.booksRepository.update({ id }, updateBookDto);
  }

  async removeBook(id: string): Promise<DeleteResult> {
    return await this.booksRepository.delete(id);
  }

  async addReview(
    bookId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const book = await this.booksRepository.findOneBy({ id: bookId });
    const newReview = new Review({
      ...createReviewDto,
      book,
    });
    return await this.reviewsRepository.save(newReview);
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<UpdateResult> {
    return await this.reviewsRepository.update({ id }, updateReviewDto);
  }

  async removeReview(id: string): Promise<DeleteResult> {
    return await this.reviewsRepository.delete({ id });
  }
}
