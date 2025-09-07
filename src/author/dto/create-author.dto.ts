import { IsDate, IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { Book } from "../../book/entities/book.entity";

export class CreateAuthorDto {
    @IsNotEmpty({ message: 'O nome do autor é obrigatório' })
    name: string;
    
    @IsDateString({}, { message: 'Data de nascimento inválida' })
    birthDate?: string;    
}
