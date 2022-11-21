FROM node:19.1-alpine3.15 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app/

RUN npm run build 

EXPOSE 4200

CMD ["node", "dist/ngforecast/main.js"]
