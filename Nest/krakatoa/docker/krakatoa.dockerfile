FROM node:latest
LABEL key="Gustavo Santos"

ENV NODE_ENV=development
RUN npm install 
ENTRYPOINT ["npm", "start:dev"]
EXPOSE 5000:5000 