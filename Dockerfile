FROM node:16.14.2-alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . ./

EXPOSE 8080

CMD [ "yarn", "preview" ]