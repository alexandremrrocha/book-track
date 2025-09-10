import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('AuthorService', () => {
  let service: AuthorService;
  let repository: jest.Mocked<Repository<Author>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            preload: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    repository = module.get(getRepositoryToken(Author));
  });

  it('should create an author', async () => {
    const dto = { name: 'Machado de Assis' };
    const author = { id: 1, ...dto };

    repository.create.mockReturnValue(author as Author);
    repository.save.mockResolvedValue(author as Author);

    const result = await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(author);
    expect(result).toEqual(author);
  });

  it('should list all authors sorted', async () => {
    const authors = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }] as Author[];
    repository.find.mockResolvedValue(authors);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalledWith({ order: { name: 'ASC' } });
    expect(result).toEqual(authors);
  });

  it('should return an author by id', async () => {
    const author = { id: 1, name: 'Autor' } as Author;
    repository.findOne.mockResolvedValue(author);

    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(author);
  });

  it('should throw error if not find author', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update an existing author', async () => {
    const dto = { name: 'Novo Nome' };
    const updatedAuthor = { id: 1, ...dto } as Author;

    repository.preload.mockResolvedValue(updatedAuthor);
    repository.save.mockResolvedValue(updatedAuthor);

    const result = await service.update(1, dto);

    expect(repository.preload).toHaveBeenCalledWith({ id: 1, ...dto });
    expect(repository.save).toHaveBeenCalledWith(updatedAuthor);
    expect(result).toEqual(updatedAuthor);
  });

  it('should throw error if cant find author to update', async () => {
    repository.preload.mockResolvedValue(null);

    await expect(service.update(1, { name: 'Teste' })).rejects.toThrow(NotFoundException);
  });

  it('should remove an existing author', async () => {
    repository.delete.mockResolvedValue({ affected: 1 } as any);

    const result = await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });

  it('should throw error if not find author to delete', async () => {
    repository.delete.mockResolvedValue({ affected: 0 } as any);

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});
