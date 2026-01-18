FROM node:22-alpine AS build

WORKDIR /app

COPY . .

RUN npm i
RUN npm run publish

FROM node:22-alpine AS run

WORKDIR /app

COPY --from=build /app/predist .

EXPOSE 80
ENTRYPOINT ["node", "index.js"]