import { Application } from 'express';
import rankingRouter from './api/controllers/ranking/router';
export default function routes(app: Application): void {
  app.use('/api/v1/query/location', rankingRouter);
};