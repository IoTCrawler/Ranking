import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { CREATED, NO_CONTENT, OK } from 'http-status-codes';
// import { env } from '../validateEnv';

export class IndexClient {
    private readonly client: AxiosInstance;
    private readonly contentType: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } };
    
    constructor(indexUrl: string) {
        this.client = axios.create({
            baseURL: indexUrl,
            headers: {
                'Accept': 'application/ld+json'
            }
        });
    }

    public async queryRectangle(params: object): Promise<object[]> {
        // const result = await this.client.get<Entity[]>(`/query/query`, {
        //     params: {
        //         ... params
        //     }
        // });

        // if (result.status !== OK) {
        //     throw new NgsiError(result.status, 'Failed to retrieve points');
        // }

        // if (result.data.length !== ids.length) {
        //     console.warn(`Some of the points are missing. Requested: ${ids.length}. Found: ${result.data.length}`);
        // }

        // return result.data;
        return [
            {
                "id": "urn:ngsi-ld:Sensor:demoSensor1",
                "type": "temperature",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        3.803561677,
                        18.462966417
                    ]
                },
                "completeness": 0.34,
                "timeliness": 0.87,
                "plausibility": 0.88,
                "artificiality": 0.67,
                "concordance": 0.79
            },
            {
                "id": "urn:ngsi-ld:Sensor:demoSensor2",
                "type": "temperature",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        7.803561677,
                        5.462966417
                    ]
                },
                "completeness": 0.34,
                "timeliness": 0.87,
                "plausibility": 0.88,
                "artificiality": 0.67,
                "concordance": 0.79
            }
        ];
    }

    public async queryPoint(params: object): Promise<object[]> {
        // const result = await this.client.get<Entity[]>(`/query/query`, {
        //     params: {
        //         ... params
        //     }
        // });

        // if (result.status !== OK) {
        //     throw new NgsiError(result.status, 'Failed to retrieve points');
        // }

        // if (result.data.length !== ids.length) {
        //     console.warn(`Some of the points are missing. Requested: ${ids.length}. Found: ${result.data.length}`);
        // }

        // return result.data;
        return [
            {
                "id": "urn:ngsi-ld:Sensor:demoSensor1",
                "type": "temperature",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        3.803561677,
                        18.462966417
                    ]
                },
                "completeness": 0.34,
                "timeliness": 0.87,
                "plausibility": 0.88,
                "artificiality": 0.67,
                "concordance": 0.79,
                "distance": 1232.45
            },
            {
                "id": "urn:ngsi-ld:Sensor:demoSensor2",
                "type": "temperature",
                "location": {
                    "type": "Point",
                    "coordinates": [
                        7.803561677,
                        5.462966417
                    ]
                },
                "completeness": 0.34,
                "timeliness": 0.87,
                "plausibility": 0.88,
                "artificiality": 0.67,
                "concordance": 0.79,
                "distance": 1232.45
            }
        ];
    }
}