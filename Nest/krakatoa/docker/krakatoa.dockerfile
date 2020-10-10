FROM node:14.9.0-alpine3.10

LABEL key="Gustavo Santos"

WORKDIR /app

COPY package.json *yarn* ./

RUN yarn install

COPY . .

EXPOSE 5000:5000

CMD [ "yarn","start:debug" ]