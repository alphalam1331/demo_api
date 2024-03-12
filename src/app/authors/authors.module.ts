import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsController } from '@/app/authors/authors.controller';
import { AuthorsService } from '@/app/authors/authors.service';
import { Author } from '@/models/author/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
