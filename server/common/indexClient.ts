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

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import L from "../common/logger";
// import { env } from '../validateEnv';

export class IndexClient {
  private readonly client: AxiosInstance;
  private readonly contentType: AxiosRequestConfig = {
    headers: { "Content-Type": "application/json" },
  };

  constructor(indexUrl: string) {
    L.debug(`NGSI-LD broker URL: ${indexUrl}`);
    this.client = axios.create({
      baseURL: indexUrl,
      headers: {
        Accept: "application/ld+json",
      },
    });
  }

  public async getEntities(params: object, headers: object): Promise<object[]> {
    L.debug(
      `Calling Broker params: ${JSON.stringify(
        params
      )} headers: ${JSON.stringify(headers)}`
    );
    const result = await this.client.get<object[]>(`/ngsi-ld/v1/entities`, {
      params: params,
      headers: headers,
    });

    // if (result.status !== OK) {
    //  Promise.reject()
    // }

    return result.data;
  }
}
