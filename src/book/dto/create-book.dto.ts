import { Author } from "../../author/entities/author.entity";
import { Category } from "../../category/entities/category.entity";
import { BookStatus } from "../book-status.enum";

export class CreateBookDto {
    title: string;
    author: Author;
    category: Category;
    status: BookStatus;
    pages: number;
}
