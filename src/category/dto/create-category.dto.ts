import { Book } from "../../book/entities/book.entity";

export class CreateCategoryDto {
    name: string;
    books: Book[];    
}
