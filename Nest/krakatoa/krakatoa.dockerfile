FROM node:14.9.0-alpine3.10

LABEL key="Gustavo Santos"

WORKDIR /app

COPY package.json package.lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000:5000

CMD [ "npm","run","start:debug" ]