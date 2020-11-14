import * as express from 'express';
import { itineraryModel } from '../Models'
import { IController, Itinerary, IRequestWithUser } from '../Types'
import { authMiddleware } from '../Middleware'

export class ItineraryController implements IController {
    public path = '/itinerary'
    public router = express.Router()
    private itinerary = itineraryModel
     
    constructor() {
      this.intializeRoutes();
    }

    public intializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.getAllItins);
    }

    getAllItins = (request: IRequestWithUser, response: express.Response) => {
      if (request.user) {
        this.itinerary.find({_id: { $in : request.user.itineraryIds } }).then((itineraries: Itinerary[]) => {
          response.send(itineraries)
        })
      }
    }
}