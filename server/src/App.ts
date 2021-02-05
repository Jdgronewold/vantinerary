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
 
  constructor(controllers: { new(): IController}[], port: number) {
    this.app = express();
    this.port = port;

    const initialize = async () => {
 
      this.initializeMiddlewares();
      await this.connectToDatabase()
      this.initializeControllers(controllers);
      this.initializeErrorHandling()
    }

    initialize()

  }
 
  private initializeMiddlewares() {
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(parser.json());
    this.app.use(parser.urlencoded({ extended: true }));
    this.app.use(compression());
  }
 
  private initializeControllers(controllers: { new(): IController}[]) {
    controllers.forEach((controller) => {
      const initializeController = new controller()
      this.app.use('/', initializeController.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async connectToDatabase() {
    try {
      console.log(config)
      
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