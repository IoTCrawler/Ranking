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
