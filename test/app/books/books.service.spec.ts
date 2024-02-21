import { Test, TestingModule } from '@nestjs/testing';

import { BooksService } from '../../../src/app/books/books.service';
import { Book } from '../../../src/models/book/book.entity';
import { Review } from '../../../src/models/review/review.entity';
import { getRepositoryTokens } from '../../test-helpers/getRepositoryTokens';
describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, ...getRepositoryTokens([Book, Review])],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should get an empty list of books', () => {
  //   const allBooks = service.findAllBook();
  //   expect(allBooks).toBe([]);
  // });
});
