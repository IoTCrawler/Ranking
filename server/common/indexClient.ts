import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { CREATED, NO_CONTENT, OK } from 'http-status-codes';

import L from '../common/logger'
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
    
    public async getEntities(params: object, headers: object): Promise<object[]> {
        L.debug(`Calling Indexer params: ${JSON.stringify(params)} headers: ${JSON.stringify(headers)}`);
        const result = await this.client.get<object[]>(`/ngsi-ld/v1/entities`, {
            params: params,
            headers: headers
        });

        if (result.status !== OK) {
            throw new Error('Failed to retrieve points');
        }

        return result.data;
    }
}