import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Category } from '../../category/entities/category.entity';
import { BookStatus } from '../book-status.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @Column({ type: 'enum', enum: BookStatus, default: BookStatus.TO_READ })
  status: BookStatus;

  @Column({ type: 'int', nullable: true })
  pages: number;

  @Column({ type: 'int', default: 0 })
  currentPage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
