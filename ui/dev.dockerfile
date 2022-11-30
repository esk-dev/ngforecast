FROM node:19-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

#RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "serv"]
