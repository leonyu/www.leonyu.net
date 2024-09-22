FROM docker.io/library/alpine:3.20 AS builder
RUN apk add --no-cache nodejs npm
COPY . /build
WORKDIR /build
RUN npm install && npm run lint && npm run build && npm run test -- --ci --coverage
RUN rm -rf node_modules && npm install --omit=dev
RUN mkdir /stage && cp -r /build/dist /build/node_modules /build/package.json /stage
