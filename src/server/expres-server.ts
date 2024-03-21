import express from "express";

import {IExpress} from "../interfaces/index";

class ExpressServer implements IExpress<express.Express> {
  private express: express.Express;
  private host: string;
  private port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;

    this.express = express();
  }

  public getExpress(): express.Express {
    return this.express;
  }

  public async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.express.listen(this.port, this.host, () => {
        console.log(
          `Use express server: App listening on http://${this.host}:${this.port}`
        );

        return resolve();
      });
    });
  }
}

export default ExpressServer;
