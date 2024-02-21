import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
} from 'typeorm';

import { Author } from '../author/author.entity';
import { BaseAbstractEntity } from '../base-abstract-entity';
import { Review } from '../review/review.entity';

@Entity()
@Unique('UQ_TITLE', ['title'])
export class Book extends BaseAbstractEntity<Book> {
  @Column()
  title: string;
  @Column()
  publishDate: Date;
  @ManyToMany(() => Author, (author) => author.publications)
  @JoinTable({ name: 'written_by' })
  authors: Author[];

  @OneToMany(() => Review, (comment) => comment.book, { cascade: true })
  @JoinColumn()
  reviews: Review[];
}
