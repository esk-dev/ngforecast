### STAGE 1: BUILD UI ###
FROM node:16-alpine as ui-build

COPY ui/package*.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY /ui .

## BUILD ANGULAR UI IN PROD

RUN npm run build 

### STAGE 2: Setup api server ###

FROM node:16-alpine 

WORKDIR /app

COPY /server/ /app/

RUN npm ci

COPY --from=ui-build /app/dist /app/public

EXPOSE 7000

CMD ["node", "server.js"]
