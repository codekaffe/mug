FROM node:16.6-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . .

ENV NODE_ENV=production

RUN npm prune

RUN node src/version.js overseer > version.txt

CMD ["npm", "start"]
