FROM node:12.16.0-alpine as builder

WORKDIR /usr/src/app/

COPY package.json ./

COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn","start"]

