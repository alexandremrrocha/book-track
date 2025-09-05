import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>
  ){}

  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  findAll() {
    return this.authorRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: {id} });
    if(!author){
      throw new NotFoundException("Autor não foi encontrado");
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const updateAuthor = await this.authorRepository.preload({id, ...updateAuthorDto});
    if(!updateAuthor){
      throw new NotFoundException("Nenhum autor foi atualizado");
    }
    return this.authorRepository.save(updateAuthor);
  }

  async remove(id: number) {
    const deleted = await this.authorRepository.delete(id);
    if (!deleted.affected){
      throw new NotFoundException('Nenhum autor foi deletado');
    }  
    return { deleted: true };
  }
}
