import { Test, TestingModule } from '@nestjs/testing';

import { BooksController } from '../../../src/app/books/books.controller';
import { BooksService } from '../../../src/app/books/books.service';
import { Book } from '../../../src/models/book/book.entity';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue({ createBook: () => Book })
      .compile();

    booksController = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
});
