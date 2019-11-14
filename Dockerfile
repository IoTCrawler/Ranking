FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

# build javscript
RUN npm clean-install
RUN npm run compile

# delete dev dependencies
# switch to production mode
ENV NODE_ENV=production
RUN npm prune

EXPOSE 3003

CMD [ "npm", "start" ]
