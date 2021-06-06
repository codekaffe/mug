FROM node:14-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

RUN node src/version.js overseer > version.txt

CMD ["npm", "start"]
