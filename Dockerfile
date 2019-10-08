FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

# build javscript
RUN npm install
RUN npm run compile

# delete dev dependencies
ENV NODE_ENV=production
RUN npm prune

EXPOSE 3000

CMD [ "npm", "start" ]
