# IoTCrawler Ranking

The Ranking component facilitates ranking mechanism for IoT resources. Ranking and resource selection rely on the registry built (and constantly updated) by crawling and indexing methods. The purpose of Ranking is to aid users and applications to not only find a set of resources relevant to their needs, but also to select the best or most appropriate one(s) from that set. There are multiple criteria for ranking IoT resources such as data type, proximity, latency, availability. The Ranking component supports application-dependent, multi-criteria ranking.

* [Introduction](#introduction)
* [Getting Started](#getting-started)
  * [Quick Start](#quick-start)
  * [Prerequisites](#prerequisites)
  * [Run It](#run-it)
  * [Test It](#test-it)
  * [Try It](#try-it)
  * [Run It](#run-it)
  * [Debug It](#debug-it)
* [Deploy to Docker](#deploy-to-docker)
* [Release](#release)
* [Contributing](#contributing)
* [Testing](#testing)
* [License](#license)

## Introduction



## Getting Started

### Quick Start

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

### Prerequisites

Install all package dependencies (one time operation)

```shell
npm install
```

### Run It
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

### Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

### Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```


### Debug It

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

Execute the following command to deploy the app via Docker. Configure sample.env accordingly.

```shell
docker build --tag=iotcrawler-ranking .
docker run -p 3003:3003 --env-file=sample.env iotcrawler-ranking
```

## Release

Binary and source releases are provided on our [Releases](https://github.com/IoTCrawler/express-hello/releases) page.

## Contributing

We welcome contributions to the Hello-world project in many forms. We are busy creating the documentation.

## Testing

We are busy creating the documentation.

## License

The project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.
