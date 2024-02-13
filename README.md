# Projeto de Cardápio Online

Este projeto foi um desafio técnico para uma vaga full stack e   onsiste em uma aplicação de cardápio online, com uma API para gerenciar os produtos do cardápio e uma interface de usuário para visualizar e interagir com esses produtos.

## Tecnologias Utilizadas

- Backend:
  - Node.js
  - NestJS
  - MySQL
  <!-- - TypeORM -->

- Frontend:
  - React(Vite)
  - React Router DOM
  - Tailwindcss

- Ferramentas Adicionais:
  - Docker

## Requisitos

### Backend

O backend oferece os seguintes endpoints:

- Autenticação: `POST /auth/login`
- Gerenciamento de Categorias:
  - `GET /category`: Lista todas as categorias de produtos
- Gerenciamento de Produtos:
  - `GET /product`: Lista todos os produtos
  - `GET /product/:id`: Obtém um produto específico
  - `POST /product`: Cria um novo produto
  - `PATCH /product/:id`: Atualiza um produto existente
  - `DELETE /product/:id`: Remove um produto existente

### Frontend

O frontend inclui:
- Tela de login
- Listagem de Produtos
- Detalhes do Produto
