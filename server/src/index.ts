// things to go back and pay attention to:
// 1) process.on
// 2) error handling
// 3 read node best practices in https://github.com/i0natan/nodebestpractices

import App from './App';
import { AuthController, ItineraryController, NotesController }  from './Controllers';
import dotenv from 'dotenv';
import 'reflect-metadata';
 
dotenv.config()
const app = new App(
  [
    NotesController,
    ItineraryController,
    AuthController,
  ],
  5000,
);

app.listen();
