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


1- Foi utilizado o comando para gerar a imagem docker da aplicação nest:
* docker build --pull --rm -f "Dockerfile" -t menu-api:latest "."



Funcionou! Está tudo funcionando agora! Minhas aplicações estão rodando e já consigo acessar o banco de dados com o dbeaver porém ainda não consigo acessar minha api na porta 3500

version: '3.8'

services:
    api:
        container_name: nest-api
        build:
            context: .
            dockerfile: Dockerfile
        restart: unless-stopped
        working_dir: /var/www/
        volumes:
            - ./:/var/www
        ports:
            - "3500:3500"
        networks:
            - mysql
        depends_on:
            - db

    # nginx:
    #     container_name: nginx
    #     image: nginx:alpine
    #     restart: unless-stopped
    #     ports:
    #         - "8989:80"
    #     volumes:
    #         - ./:/var/www
    #         - ./docker/nginx/:/etc/nginx/conf.d/
    #     networks:
    #         - mysql

    db:
        container_name: mysql-db
        image: mysql:8.0.36
        command: --default-authentication-plugin=mysql_native_password
        restart: always
        env_file:
            - ./.env
        environment:
            MYSQL_DATABASE: ${MYSQL_DATABASE}
            MYSQL_ROOT_PASSWORD: ${MYSQL_PASSWORD}
            # MYSQL_PASSWORD: ${MYSQL_PASSWORD}
            # MYSQL_USER: ${MYSQL_USERNAME}
        ports:
            - ${MYSQL_LOCAL_PORT}:${MYSQL_DOCKER_PORT}
        expose:
            - ${MYSQL_DOCKER_PORT}

networks:
    mysql:
        driver: bridge


# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/api

# Install bash terminal
RUN apk update && \
    apk add --no-cache bash

# Install app dependencies with no warnings
COPY package*.json ./
RUN npm install --quiet --no-optional --no-fund --loglevel=error

# Bundle app source
COPY . .

COPY ./.env.production ./.env

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
# CMD npm start
CMD [ "npm", "run", "dev" ]


tentei acessar pelo navegador http://localhost:3500 e visuzliaar a rota GET da minha aplicação nestjs mas exibiu a seguinte mensagem ERR_EMPTY_RESPONSE e esse é meu docker ps

alexandre@DESKTOP-TM61KQ4:/mnt/c/workspace/Processo Seletivo/CoderLab/backend$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                                  NAMES
da379ccef298   backend-api    "docker-entrypoint.s…"   5 minutes ago   Up 3 minutes   0.0.0.0:3500->3500/tcp, :::3500->3500/tcp              nest-api
397c716a7ae8   mysql:8.0.36   "docker-entrypoint.s…"   5 minutes ago   Up 3 minutes   33060/tcp, 0.0.0.0:3307->3306/tcp, :::3307->3306/tcp   mysql-db