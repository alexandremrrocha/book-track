import "reflect-metadata"
import { DataSource } from "typeorm"
import { Author } from "./author/entities/author.entity"
import { Category } from "./category/entities/category.entity" 
import { Book } from "./book/entities/book.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Author, Category, Book],
    migrations: [],
    subscribers: [],
})
