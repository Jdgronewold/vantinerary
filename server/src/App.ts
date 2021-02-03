import express from 'express';
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

import { IController } from './Types'
import { errorMiddleware } from './Middleware'
import { createConnection } from 'typeorm';
import { config } from './ormconfig'
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: IController[], port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase()
    this.initializeErrorHandling()
  }
 
  private initializeMiddlewares() {
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(parser.json());
    this.app.use(parser.urlencoded({ extended: true }));
    this.app.use(compression());
  }
 
  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async connectToDatabase() {
    try {
      await createConnection(config)
    }
    catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;