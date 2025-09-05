import { Book } from "../../book/entities/book.entity";

export class CreateAuthorDto {
    name: string;
    birthDate?: string;
    books: Book[];
}
