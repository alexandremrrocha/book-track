import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { Author } from './author/entities/author.entity';
import { Category } from './category/entities/category.entity';
import { Book } from './book/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Author, Category, Book],
      synchronize: true,
      logging: true,
    }),
    AuthorModule,
    CategoryModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
