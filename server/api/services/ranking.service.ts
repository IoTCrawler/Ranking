//import Promise from 'bluebird';
import L from '../../common/logger'
import { IndexClient } from '../../common/indexClient';

function weightedSum(values: object, weights: object): number {
  return Object.keys(weights)
    .filter(key => values[key]) // For now: ignore if keys are missing from input
    .map(key => weights[key]*values[key].value)
    .reduce((sum, num) => sum + num, 0);
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
