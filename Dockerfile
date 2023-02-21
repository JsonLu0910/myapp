FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .npm

ENV PORT = 3001

EXPOSE 3001