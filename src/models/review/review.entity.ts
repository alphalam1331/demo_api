import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseAbstractEntity } from '../base-abstract-entity';
import { Book } from '../book/book.entity';

@Entity()
export class Review extends BaseAbstractEntity<Review> {
  @Column()
  content: string;
  @Column()
  score: number;
  @ManyToOne(() => Book, (book) => book.reviews)
  @JoinColumn()
  book: Book;
}
