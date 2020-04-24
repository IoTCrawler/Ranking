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

//import Promise from 'bluebird';
import L from '../../common/logger'
import { IndexClient } from '../../common/indexClient';
import jp from 'jsonpath';

function weightedSum(values: object, weights: object): number {
  return Object.keys(weights)
    .filter(key => values[key]) // For now: ignore if keys are missing from input
    .map(key => weights[key]*values[key].value)
    .reduce((sum, num) => sum + num, 0);
}

/**
 * Navigate with attribute path
 * Don't use this directly, use navigatePathToObject or navigatePathToValue instead
 * @param objectlist list of NGSI-LD entities
 * @param {string} path attribute path
 * @returns {[object]} list of mappings {from,to}
 */
function navigatePath(objectlist, path: string): [object] {
  return jp.nodes(objectlist, `$[*].${path}`).map(node => {
    return {
      from: objectlist[node.path[1]].id, // x.path[1] is the index of the matched entity
      to: node.value
    };
  });
}

/**
 * Navigate with attribute path to relationship objects
 * @param objectlist list of NGSI-LD entities
 * @param path attribute path ending with relationship
 */
export function navigatePathToObject(objectlist, path: string): [object] {
  return navigatePath(objectlist, path + ".object");
}

/**
 * Navigate via attribute path to property value
 * @param objectlist list of NGSI-LD entities
 * @param path attribute path ending with property
 */
export function navigatePathToValue(objectlist, path: string): [object] {
  return navigatePath(objectlist, path + ".value");
}

export class RankingService {
  private readonly client: IndexClient;

  constructor(indexUrl: string) {
    L.debug('Creating RankingService');
    this.client = new IndexClient(indexUrl);
  }
  //   all(): Promise<Example[]> {
  //     L.info(examples, 'fetch all examples');
  //     return Promise.resolve(examples);
  //   }

  //   byId(id: number): Promise<Example> {
  //     L.info(`fetch example with id ${id}`);
  //     return this.all().then(r => r[id])
  //   }

  //   create(name: string): Promise<Example> {
  //     L.info(`create example with name ${name}`);
  //     const example: Example = {
  //       id: id++,
  //       name
  //     };
  //     examples.push(example)
  //     return Promise.resolve(example);
  //   }

  public async rank(params: any, headers: object): Promise<object[]> {
    L.debug('RankingService.near: Calling indexer client');
    let p = JSON.parse(JSON.stringify(params)); // deep copy the query parameters
    delete p['rankWeights'];

    let entities = await this.client.getEntities(p, headers);
    
    let newentities = typeof params.rankWeights === 'undefined' ? 
      entities : // if no rankWeights are defined, return entities unchanged
      entities.map(
        entity => ({ 
          ... entity, 
          'http://iotcrawler.eu/rankScore': { 
            type: 'Property', 
            value: weightedSum(entity, params.rankWeights)
          }
        })
      );
    return newentities;
  }
}
