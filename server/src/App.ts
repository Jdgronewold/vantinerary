import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

import { IController } from './Types'
import { errorMiddleware } from './Middleware'
import { saveMockUser } from './Utils'

const options = {
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true 
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect('mongodb://mongo:27017/api', options).then(async ()=>{
    console.log('MongoDB is connected')
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      await saveMockUser()
    }
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}
 
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
    connectWithRetry()
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;