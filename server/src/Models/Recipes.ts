import mongoose from 'mongoose';
import { IRecipe } from '../Types'

const recipeSchema = new mongoose.Schema({
    author: String,
    ingredients: [{
        quantity: String,
        name: String
    }],
    name: String,
    authorId: String
  });

  export const recipeModel = mongoose.model<IRecipe & mongoose.Document>('Recipe', recipeSchema)