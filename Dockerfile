FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy project definitions
COPY package*.json ./

# install dependencies
RUN npm clean-install

# copy app
COPY . /usr/src/app

# compile app
RUN npm run compile

# delete dev dependencies
# switch to production mode
ENV NODE_ENV=production
RUN npm prune

EXPOSE 3003

CMD [ "node", "dist/index.js" ]
