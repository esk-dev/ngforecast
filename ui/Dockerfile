FROM node:19.1-alpine3.15 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . /app

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]
