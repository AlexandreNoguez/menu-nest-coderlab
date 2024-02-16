# Projeto de Cardápio Online

Este projeto foi um desafio técnico para uma vaga full stack e   onsiste em uma aplicação de cardápio online, com uma API para gerenciar os produtos do cardápio e uma interface de usuário para visualizar e interagir com esses produtos.

## Tecnologias Utilizadas

- Backend:
  - Node.js
  - NestJS
  - MySQL
  - TypeORM

- Frontend:
  - React(Vite)
  - React Router DOM
  - Tailwindcss
  - react-hook-form

- Ferramentas Adicionais:
  - Docker

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
- Gerenciar Produtos (Adicionar, Editar, Remover)
- Detalhes do Produto

### Notas
- É necessário ter o docker instalado
- É necessário ter o nodejs instalado
- O arquivo CoderLabAPI tem todas as chamadas na API utilizando o Insomnia

### Para executar o projeto:
1. Clonar o reposiótio `git clone https://github.com/AlexandreNoguez/menu-nest-react-coderlab`
2. Renomear o arquivo `.env.example` para `.env`
3. Acesse o diretório do projeto `cd menu-nest-react-coderlab`
4. Execute o comando `docker-compose up -d`
5. Acesse a pasta server `cd server`
6. Execute o comando `npm run dev`
7. Quando terminar de executar todos os serviços pode ser acessado no navegador <a href="http://localhost:5173">localhost</a>

## Desafios futuros!!

### Frontend
<ol>
  <li>Adicionar Yup ou alguma outra lib para validar e retornar os erros do formulário para o usuário.</li>
  <li>Finalizar edição de produtos.</li>
  <li>Finalizar exclusão de produtos.</li>
</ol>

### Backend
<ol>
  <li>Automatizar migrations para criação de novas tabelas.</li>
  <li>Desabilitar o sync para publicar o app.</li>
  <li>Finalizar conexão da API com o Banco de Dados no docker-compose.</li>
</ol>