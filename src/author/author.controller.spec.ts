import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService;

  const mockAuthorService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with correct data', async () => {
    const dto: CreateAuthorDto = { name: 'John Doe' };
    const result = { id: 1, ...dto };

    mockAuthorService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return an array of authors', async () => {
    const result = [{ id: 1, name: 'John Doe' }];
    mockAuthorService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one author', async () => {
    const result = { id: 1, name: 'John Doe' };
    mockAuthorService.findOne.mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update and return the author', async () => {
    const dto: UpdateAuthorDto = { name: 'Jane Doe' };
    const result = { id: 1, ...dto };
    mockAuthorService.update.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove the author', async () => {
    const result = { deleted: true };
    mockAuthorService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
