/* 
 *  Copyright 2020 Siemens AG Oesterreich
 *  
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *  
 *  SPDX-License-Identifier: Apache-2.0
 *  
 */

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
        try {
            const result = await this.client.get<object[]>(`/ngsi-ld/v1/entities`, {
                params: params,
                headers: headers
            });
            return result.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                L.error("E1" + error.response.data);
                L.error(error.response.status);
                L.error(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                L.error("E2" + error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                L.error('E3', error.message);
            }
            L.error("E4" + error.config);
        }

        // if (result.status !== OK) {
        //     
        // }

        
    }
}