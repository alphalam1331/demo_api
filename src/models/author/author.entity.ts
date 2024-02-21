import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';

import { BaseAbstractEntity } from '../base-abstract-entity';
import { Book } from '../book/book.entity';

@Entity()
@Unique('UQ_NAMES', ['firstName', 'middleName', 'lastName'])
export class Author extends BaseAbstractEntity<Author> {
  @Column()
  firstName: string;
  @Column({ nullable: true })
  middleName: string;
  @Column()
  lastName: string;
  @ManyToMany(() => Book, (book) => book.authors)
  @JoinTable({ name: 'published' })
  publications: Book[];
}
