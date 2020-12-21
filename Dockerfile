FROM node:latest

RUN mkdir /atelier

ADD . /atelier

WORKDIR /atelier

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]