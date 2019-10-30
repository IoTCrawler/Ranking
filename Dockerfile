# Build container
FROM node:lts-alpine as builder

WORKDIR /usr/src/app

## Install build dependencies
COPY package*.json ./
RUN npm ci --quiet

## Copy source
COPY ./server server
COPY tsconfig.json .
COPY build.ts .

## Build
RUN npm run compile


# Runtime container
FROM node:lts-alpine

WORKDIR /app

## Install runtime dependencies
COPY package*.json ./

## Switch to production environment
ENV NODE_ENV=production

## Install runtime dependencies
RUN npm ci --quiet

## Copy build output from previous stage
COPY --from=builder /usr/src/app/dist dist

EXPOSE 3000

## Start the App
CMD [ "npm", "start" ]
