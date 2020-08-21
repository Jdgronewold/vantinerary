import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

import { IController } from './Types'
import { errorMiddleware } from './Middleware'
import { saveMockUser, saveMockRecipes } from './Utils'
 
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

  private connectToDatabase() {
    mongoose
    .connect(
      'mongodb://mongo:27017/api',
      { useNewUrlParser: true }
    )
    .then(async () => {   
      console.log(process.env.NODE_ENV);
         
      if (process.env.NODE_ENV === 'development') {
        await saveMockUser()
        await saveMockRecipes()
      }
      console.log('MongoDB Connected')
    })
    .catch((err: Error) => console.log(err));
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;