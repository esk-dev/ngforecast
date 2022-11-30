### STAGE 1: BUILD UI ###
FROM node:19-alpine as angular-build

WORKDIR /ui

COPY ui/package.json ui/package-lock.json ./

RUN npm ci 

COPY /ui .

## BUILD ANGULAR UI IN PROD

RUN npm run build 

### STAGE 2: Setup api server ###

FROM node:19-alpine 

WORKDIR /app

COPY server/package.json server/package-lock.json ./

RUN npm ci

COPY /server/ /app/

COPY --from=angular-build /ui/dist /app/dist

EXPOSE 80:7000

CMD ["node", "index.js"]
