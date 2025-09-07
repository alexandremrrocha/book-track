import { IsNotEmpty } from "class-validator";
import { Book } from "../../book/entities/book.entity";

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
    name: string;   
}
