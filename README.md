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
- Devido a falha de reprodução em outras máquinas e sistemas operacionais, removi os serviços client e api do docker compose
- Subi os arquivos .env com as variáveis de ambiente configuradas para fins de facilitar o teste do aplicativo

### Para executar o projeto:
1. Clonar o reposiótio 
```bash 
git clone https://github.com/AlexandreNoguez/menu-nest-react-coderlab
```

2. Acesse o diretório do projeto 
```bash
cd menu-nest-react-coderlab
```

3. Execute o comando 
```bash 
docker-compose up -d
```

4. Acesse a pasta client 
```bash 
cd client
```

5. Execute o comando para baixar as dependências
```bash 
npm install
``` 

6. Execute o client 
```bash
npm run dev
```

7. Em outro terminal, acesse a pasta server 
```bash 
cd server
```

8. Execute o compando para baixar as dependências
```bash 
npm install
``` 

9. Execute o servidor 
```bash
npm run dev
```

10. Quando terminar de executar todos os serviços, o projeto pode ser acessado no navegador <a href="http://localhost:5173">localhost</a>

## Melhorias futuras!!

### Frontend
<ol>
  <li>Adicionar Yup ou alguma outra lib para validar e retornar os erros do formulário para o usuário.</li>
  <li>Finalizar edição de produtos.</li>
  <li>Finalizar exclusão de produtos.</li>
</ol>

### Backend
<ol>
  <li>Configurar os containers para executar, installar e expor as portas corretas.</li>
  <li>Automatizar migrations para criação de novas tabelas.</li>
  <li>Desabilitar o sync para publicar o app.</li>
  <li>Finalizar conexão da API com o Banco de Dados no docker-compose.</li>
</ol>