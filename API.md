# IoTCrawler Ranking API

The Ranking component extends NGSI-LD. Specifically it extends the query to retrieve entities by one additional query parameter `rankWeights[...]`. The names of the NGSI-LD properties used for ranking are added in square brackets as part of the query parameter name. The value of the query parameter is the ranking weight value. The result will contain a rank score.

## Query

For the NGSI-LD properties `p1` and `p2` which should be used for ranking we would add the following query parameters with the values `0.2` and `0.8` respectively:

```
rankWeights[p1]=0.2&rankWeights[p2]=0.8
```

### Example

Example HTTP GET request for the NGSI-LD properties `completeness` and `artificiality` with different rank weights:

```http
GET /ngsi-ld/v1/entities?type=temperature&rankWeights[completeness]=0.4&rankWeights[artificiality]=0.6
```

## Response

| NGSI-LD property | `rankWeight` value | property value |
| ---------------- | ------------------ | -------------- |
| `completeness`   | 0.4                | 0.6            |
| `artificiality`  | 0.6                | 0.8            |

The rank score is a weighted sum: `0.4*0.6+0.6*0.8=0.72`

### Example

Eventually the result of the query would look like this:

```json
{
    "id": ...,
    "type": "temperature",
    "completeness": {
        "type": "Property",
        "value": "0.6"
    },
    "artificiality": {
        "type": "Property",
        "value": "0.6"
    },
    "rankScore": {
        "type": "Property",
        "value": "0.72"
    },
    ...
    "@context": ...
}
```
