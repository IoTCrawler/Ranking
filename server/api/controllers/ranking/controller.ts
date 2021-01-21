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

import { RankingService } from "../../services/ranking.service";
import { Request, Response } from "express";
import L from "../../../common/logger";
import { StatusCodes } from "http-status-codes";

function weightedSum(values: object, weights: object): number {
  return Object.keys(weights)
    .filter((key) => values[key]) // For now: ignore if keys are missing from input
    .map((key) => weights[key] * values[key].value)
    .reduce((sum, num) => sum + num, 0);
}

export class Controller {
  private rankingService: RankingService;

  constructor(url: string) {
    L.debug("Constructing controller", url);
    this.rankingService = new RankingService(url);
  }

  byId(req: Request, res: Response): void {
    L.debug(
      `Controller.byId: Calling rankingService.byId(${JSON.stringify(
        req.query
      )})`
    );
    const id = req.params['id'];

    this.rankingService
      .byId(id, req.query, req.headers)
      .then((r) => res.status(StatusCodes.OK).json(r))
      .catch(this.handleError(res));
  }

  public near(req: Request, res: Response): void {
    L.debug(
      `Controller.near: Calling rankingService.near(${JSON.stringify(
        req.query
      )})`
    );
    this.rankingService
      .rank(req.query, req.headers)
      .then((r) => res.status(StatusCodes.OK).json(r))
      .catch(this.handleError(res));
  }

  private handleError(res: Response<any>): (reason: any) => void | PromiseLike<void> {
    return (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        L.error(
          `Forwarding request to the broker returned an error: ${error.response.status}`
        );
        // Forward response from broker
        for (const header in error.response.headers) {
          if (header === "transfer-encoding") {
            continue;
          }
          res.setHeader(header, error.response.headers[header]);
        }

        res.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of http.ClientRequest
        L.error("Timeout: no response received from the broker");
        res.status(StatusCodes.GATEWAY_TIMEOUT);
        res.json({
          type: "https://uri.etsi.org/ngsi-ld/errors/InternalError",
          title: "Timeout",
          detail: "No response received from the broker",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        L.error("Request failed: Error during setup of request to broker");
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          type: "https://uri.etsi.org/ngsi-ld/errors/InternalError",
          title: "Request failed",
          detail: "Error during setup of request to broker",
        });
      }
    };
  }
}
