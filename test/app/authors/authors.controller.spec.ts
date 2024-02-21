import { Test, TestingModule } from '@nestjs/testing';

import { AuthorsController } from '../../../src/app/authors/authors.controller';
import { AuthorsService } from '../../../src/app/authors/authors.service';
import { Author } from '../../../src/models/author/author.entity';

describe('AuthorsController', () => {
  let authorsController: AuthorsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [AuthorsService],
    })
      .overrideProvider(AuthorsService)
      .useValue({ create: jest.fn(() => Author) })
      .compile();

    authorsController = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(authorsController).toBeDefined();
  });
});
