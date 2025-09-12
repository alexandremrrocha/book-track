# 📚 Backend - Sistema de Livros

Este é o **backend** do sistema de gerenciamento de livros, desenvolvido em [NestJS](https://nestjs.com/) + [TypeScript](https://www.typescriptlang.org/) e banco de dados via [TypeORM](https://typeorm.io/).

Ele é responsável por gerenciar **autores, categorias e livros**, fornecendo uma API REST para o frontend.

---

## 🚀 Tecnologias utilizadas

- [NestJS](https://nestjs.com/) (framework Node.js)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/) (ORM)
- [Jest](https://jestjs.io/) (testes unitários e e2e)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📂 Estrutura do Projeto

```
src/
┣ author/ # CRUD de autores
┣ book/ # CRUD de livros
┣ category/ # CRUD de categorias
┣ app.module.ts # Módulo raiz
┗ main.ts # Ponto de entrada da aplicação
```
---

## ⚙️ Como rodar o projeto localmente

1. **Rodar localmente**

```
npm install
npm run dev
```

2. **Rodando os testes**

```
npm run test
```
---

## 📌 Endpoints principais

- GET /authors → Lista todos os autores
- POST /authors → Cria um novo autor
- GET /books → Lista todos os livros (com autor e categoria)
- POST /books → Cadastra um livro

---

## 📅 Roadmap

- Autenticação com JWT
- Paginação e filtros avançados em listagens
- Documentação automática com Swagger
- Deploy em ambiente de nuvem

---

## 📜 Licença

Este projeto é licenciado sob a [MIT License](LICENSE)