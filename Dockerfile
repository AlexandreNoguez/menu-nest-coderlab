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
CMD [ "npm", "run", "start" ]
