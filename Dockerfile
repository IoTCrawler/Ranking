# Build container
FROM node:14-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install build dependencies
COPY package*.json ./
RUN npm clean-install

## Copy source
COPY . /usr/src/app
COPY tsconfig.json .
COPY build.ts .

## Build
RUN npm run compile

# Runtime container
FROM node:14-alpine

WORKDIR /app

## Install runtime dependencies
COPY package*.json ./

## Switch to production environment
ENV NODE_ENV=production

## Install runtime dependencies
RUN npm clean-install

## Copy build output from previous stage
COPY --from=builder /usr/src/app/dist dist

EXPOSE 3003

CMD [ "node", "dist/index.js" ]
