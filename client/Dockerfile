FROM node:22-alpine AS build

COPY . .

RUN npm i
RUN npm run publish

FROM node:22-alpine AS run

COPY --from=build /build .

EXPOSE 3000
CMD ["node", "."]