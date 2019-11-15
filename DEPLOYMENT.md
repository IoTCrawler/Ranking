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

If the indexer is also running as a docker container in the default bridge, then you can use the container name as hostname, e.g., if the indexer is running as Docker container `indexer` then this should work (currently untested):

```shell
-e INDEXER_URL=http://indexer
```

For development: via the same mechanism it's possible to configure `LOG_LEVEL` and `PORT` besides a few others (see `sample.env` for the complete list).

### Port

By default the app binds to port 3003 (this might change in the future). To forward the port of the container to the host either use the `--publish-all` option or define a custom port mapping, e.g., `-p 3003:3003`.

Some details here: https://docs.docker.com/engine/reference/run/#expose-incoming-ports.

### General

Use `--name` and `--detach` as needed. The `--init` is not strictly necessary.

### Memory (optional)

If memory should be constrained use these parameters (with example values):

```shell
--memory "300M" --memory-swap "1G"
```

### Complete example

```shell
docker run --memory "300M" --memory-swap "1G" --name "ranking" --init --detach --env INDEXER_URL=http://localhost:3002 --publish-all gitlab.iotcrawler.net:4567/ranking/ranking
```

You can then use the hostname `ranking` to connect from other docker containers to the ranking component.

If you used the `--publish-all` option, look at the output of `docker port ranking` or `docker ps` to find out at which port the app is responding.
