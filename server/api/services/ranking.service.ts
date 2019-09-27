import Promise from 'bluebird';
import L from '../../common/logger'
import { IndexClient } from '../../common/indexClient';

let id = 0;
interface Example {
  id: number,
  name: string
};

const examples: Example[] = [
    { id: id++, name: 'example 0' }, 
    { id: id++, name: 'example 1' }
];

export class RankingService {
    private readonly client: IndexClient ;

    constructor(indexUrl: string) {
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

  near(params: object): Promise<object[]> {
    L.info('RankingService.near: Calling indexer client');
    return Promise.resolve(this.client.queryPoint(params));
  }


}

export default new RankingService('http://localhost:8083');