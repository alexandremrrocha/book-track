import { BookStatus } from "../book-status.enum";
import { IsNotEmpty, IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  title: string;

  @IsInt({ message: 'O autor é obrigatório e deve ser um número válido' })
  authorId: number;

  @IsInt({ message: 'A categoria é obrigatória e deve ser um número válido' })
  categoryId: number;

  @IsEnum(BookStatus, { message: 'Status inválido' })
  status: BookStatus;

  @IsInt({ message: 'Páginas deve ser um número' })
  pages?: number;
}
