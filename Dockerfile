FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./app/
RUN npm install

RUN mkdir ./app
COPY ./app ./app

CMD ["npm", "start"]