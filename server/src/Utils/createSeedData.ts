import { IUser, IRecipe } from '../Types'
import { userModel, recipeModel } from '../Models'
import * as bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userData: IUser = {
  name: 'Layla',
  email: 'layla@gmail.com',
  password: 'ILoveBean',
  _id: ''
}

let userID: string

export async function saveMockUser() {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await userModel.create({
      ...userData,
      password: hashedPassword,
      _id: new mongoose.Types.ObjectId()
  });
  userID = user._id
  return
}

export async function saveMockRecipes() {
  const mockRecipes: IRecipe[] = [
    {
      author: "Layla",
      authorId: userID,
      name: "Black Bean Enchiladas",
      ingredients: [
        {
          quantity: "1 can",
          name: "black beans"
        },
        {
          quantity: "10",
          name: "tortillas"
        }
      ]
    },
    {
      author: "Layla",
      authorId: userID,
      name: "Baked Falafel Wraps",
      ingredients: [
        {
          quantity: "2 cups",
          name: "dry chickpeas"
        },
        {
          quantity: "1",
          name: "yellow onion"
        }
      ]
    }
  ]

  mockRecipes.forEach(async (recipe: IRecipe) => {
    const createdRecipe = new recipeModel(recipe)
        await createdRecipe.save()
  })
  return
}

