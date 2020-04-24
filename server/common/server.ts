import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';

  import installValidator from './openapi';

import l from './logger';

const app = express();

export default class ExpressServer {
  server: http.Server;
  
  constructor() {
    app.use(require("express-status-monitor")());
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET || 'my secret'));
    app.use(express.static(`${root}/public`));
  }

  close(): any {
    this.server.close(function () {
      console.log('Express shut down')
    });
  }

  router(routes: (app: Application) => void): ExpressServer {
    installValidator(app, routes)
    return this;
  }

  listen(p: string | number = process.env.PORT || 3003): Application {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`);
    this.server = http.createServer(app);
    this.server.listen(p, welcome(p));
    return app;
  }
}
