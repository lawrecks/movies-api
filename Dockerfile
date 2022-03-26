FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./app/
RUN npm install

RUN mkdir ./src
COPY ./app ./src

CMD ["npm", "start"]