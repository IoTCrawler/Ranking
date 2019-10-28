# ranking-app

IoTCrawler Ranking app

## Quick Start

Get started developing...

```shell
# install deps
npm install

# configure app
cp sample.env .env

# edit .env
vim .env

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Deploy to Docker

Execute the following command to deploy the app via Docker. Make sure you have set the environment variables for proxies if behind firewall. For <PATH> either use '.' if you have cloned the repo first or use the git clone URL.

```shell
docker build --build-arg HTTP_PROXY=$http_proxy --build-arg HTTPS_PROXY=$https_proxy --tag=iotcrawler-ranking <PATH>
docker run -p 3000:3000 --env-file=sample.env iotcrawler-ranking
```
