import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({order: {name: 'ASC'}});
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: {id} });
    if(!category){
      throw new NotFoundException("Categoria não encontrada");
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.categoryRepository.preload({id, ...updateCategoryDto});
    if(!updateCategory){
      throw new NotFoundException("Categoria não encontrada");
    }
    return this.categoryRepository.save(updateCategory);
  }

  async remove(id: number) {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted.affected){
      throw new NotFoundException('Categoria não foi deletada');
    }  
    return { deleted: true };
  }
}
