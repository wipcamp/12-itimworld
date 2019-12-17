FROM node:12-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src ./src
COPY public ./public

RUN ls -la

RUN yarn build

FROM nginx:1.17.6-alpine

WORKDIR /app

COPY --from=builder /app/build .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80