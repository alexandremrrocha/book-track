import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ){}

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: {id} });
    if(!book){
      throw new NotFoundException("Livro não foi encontrado");
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const updateBook = await this.bookRepository.preload({id, ...updateBookDto});
    if(!updateBook){
      throw new NotFoundException("Nenhum livro foi atualizado");
    }
    return this.bookRepository.save(updateBook);
  }

  async remove(id: number) {
    const deleted = await this.bookRepository.delete(id);
    if (!deleted.affected){
      throw new NotFoundException('Nenhum livro foi deletado');
    }  
    return { deleted: true };
  }
}
