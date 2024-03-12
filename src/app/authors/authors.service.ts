import { Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Author } from '@/models/author/author.entity';
import { CreateAuthorDto } from '@/models/author/create-author.dto';
import { UpdateAuthorDto } from '@/models/author/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    const authors = this.authorsRepository.findOneBy({ id });
    return authors;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    try {
      const oldAuthor = await this.authorsRepository.findOneBy({ id });
      if (!oldAuthor) {
        throw HttpErrorByCode[404];
      }
      const newAuthor = Object.assign(oldAuthor, {
        ...updateAuthorDto,
      });
      return await this.authorsRepository.save(newAuthor);
    } catch (e) {
      return e;
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.authorsRepository.delete(id);
  }
}
