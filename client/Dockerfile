FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g vite

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
