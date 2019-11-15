# IoTCrawler Ranking Deployment

## Get Docker image

Either pull the docker image from the gitlab Docker registry or build it manually.

### Pull Docker image

To login use your gitlab username and password.

```shell
docker login gitlab.iotcrawler.net:4567
docker pull gitlab.iotcrawler.net:4567/ranking/ranking
```

It might be necessary to use the `latest` tag.

### Build Docker image

```shell
docker build -t gitlab.iotcrawler.net:4567/ranking/ranking .
```

## Run Docker image

There are different options and parameters of `docker run` which can be used for this container. When running the container, the user has to decide which of these apply.

### Configuration

It is necessary to configure a background service (usually the IoTCrawler indexer) for the Ranking to use. For example, if the indexer is running on port 3002 on the same host, then configure the Ranking docker container as following:

```shell
-e INDEXER_URL=http://localhost:3002
```

Via the same mechanism it's possible to configure `LOG_LEVEL` and `PORT` besides a few others (see `sample.env` for the complete list).

### Port

By default the app binds to port 3003 (this might change in the future). To forward the port of the container to the host either use the `-P` option or define a custom port mapping, e.g., `-p 3003:3003`.

Some details here: https://docs.docker.com/engine/reference/run/#expose-incoming-ports.

### General

Use `--name` and `--detach` as needed. The `--init` is not necessary.

### Memory (optional)

If memory should be constrained use these parameters (with example values):

```shell
--memory "300M" --memory-swap "1G"
```

### Complete example

```shell
docker run --memory "300M" --memory-swap "1G" --name "ranking" --init --detach -e INDEXER_URL=http://localhost:3002 -P gitlab.iotcrawler.net:4567/ranking/ranking
```

Look at the output of `docker port ranking` to find out at which port the app is responding.
