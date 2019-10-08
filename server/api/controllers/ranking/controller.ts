import { RankingService } from '../../services/ranking.service';
import { Request, Response } from 'express';
import L from '../../../common/logger';

function weightedSum(values: object, weights: object): number {
  return Object.keys(weights)
    .filter(key => values[key]) // For now: ignore if keys are missing from input
    .map(key => weights[key]*values[key].value)
    .reduce((sum, num) => sum + num, 0);
}

export class Controller {
  private rankingService: RankingService;

  constructor(url: string) {
    L.debug('Constructing controller', url);
    this.rankingService = new RankingService(url);
  }
  // // TODO remove
  // all(req: Request, res: Response): void {
  //   RankingService.all().then(r => res.json(r));
  // }

  // // TODO remove
  // byId(req: Request, res: Response): void {
  //   const id = Number.parseInt(req.params['id'])
  //   RankingService.byId(id).then(r => {
  //     if (r) res.json(r);
  //     else res.status(404).end();
  //   });
  // }

  // // TODO remove
  // create(req: Request, res: Response): void {
  //   RankingService.create(req.body.name).then(r =>
  //     res
  //       .status(201)
  //       .location(`/api/v1/examples/${r.id}`)
  //       .json(r),
  //   );
  // }

  public near(req: Request, res: Response): void {
    
    L.debug(`Controller.near: Calling rankingService.near(${JSON.stringify(req.query)})`);
    this.rankingService.rank(req.query, req.headers)
      .then(r => res.json(r));
  }
}
