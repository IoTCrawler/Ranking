# IoTCrawler Ranking API

The Ranking component extends NGSI-LD. Specifically it extends the query to retrieve entities by one additional query parameter `rankWeights[...]`. The names of the NGSI-LD properties used for ranking are added in square brackets as part of the query parameter name. The value of the query parameter is the ranking weight value. The result will contain a rank score.

## Query

For the NGSI-LD properties `completeness` and `artificiality` which could be used for ranking we would add the following query parameters with the values `0.2` and `0.8` respectively:

```
rankWeights[completeness]=0.2&rankWeights[artificiality]=0.8
```

### Example

Add the following example entity to NGSI-LD broker

```json
{
    "id": "iotc:Stream_Z-Wave+Node+003%3A+FGWP102+Meter+Living+Space_Sensor+%28power%29",
    "type": "iotc:IoTStream",
    "@context": {
        "iotc": "http://purl.org/iot/ontology/iot-stream#",
        "madeBySensor": {
            "@id": "http://www.w3.org/ns/sosa/madeBySensor",
            "@type": "@id"
        },
        "rdf-schema": "http://www.w3.org/2000/01/rdf-schema#",
        "sosa": "http://www.w3.org/ns/sosa/",
        "completeness":  "http://purl.oclc.org/NET/UASO/qoi2#Completeness",
        "artificiality": "http://purl.oclc.org/NET/UASO/qoi2#Artificiality"
    },
    "sosa:madeBySensor": {
        "type": "Relationship",
        "object": "iotc:Sensor_Z-Wave+Node+003%3A+FGWP102+Meter+Living+Space_Sensor+%28power%29"
    },
    "completeness": {
        "type": "Property",
        "value": 0.88
    },
    "artificiality": {
        "type": "Property",
        "value": 0.92
    }
}
```

Example HTTP GET request for the NGSI-LD properties `completeness` and `artificiality` with different rank weights:

```http
GET /ngsi-ld/v1/entities?type=iotc:IoTStream&rankWeights[completeness]=0.4&rankWeights[artificiality]=0.6
```

## Response

| NGSI-LD property | `rankWeight` value | property value |
| ---------------- | ------------------ | -------------- |
| `completeness`   | 0.4                | 0.88           |
| `artificiality`  | 0.6                | 0.92           |

The rank score is a weighted sum: `0.4*0.6+0.6*0.8=0.904`

### Example

Eventually the result of the query would look like this:

```json
[
    {
        "id": "iotc:Stream_Z-Wave+Node+003%3A+FGWP102+Meter+Living+Space_Sensor+%28power%29",
        "type": "iotc:IoTStream",
        "@context": {
            "iotc": "http://purl.org/iot/ontology/iot-stream#",
            "madeBySensor": {
                "@id": "http://www.w3.org/ns/sosa/madeBySensor",
                "@type": "@id"
            },
            "rdf-schema": "http://www.w3.org/2000/01/rdf-schema#",
            "sosa": "http://www.w3.org/ns/sosa/",
            "completeness": "http://purl.oclc.org/NET/UASO/qoi2#Completeness",
            "artificiality": "http://purl.oclc.org/NET/UASO/qoi2#Artificiality"
        },
        "sosa:madeBySensor": {
            "type": "Relationship",
            "object": "iotc:Sensor_Z-Wave+Node+003%3A+FGWP102+Meter+Living+Space_Sensor+%28power%29"
        },
        "completeness": {
            "type": "Property",
            "value": 0.88
        },
        "artificiality": {
            "type": "Property",
            "value": 0.92
        },
        "rankScore": {
            "type": "Property",
            "value": 0.9040000000000001
        }
    }
]
```
