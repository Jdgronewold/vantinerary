import { IUser } from '../Types'
import { userModel } from '../Models'
import * as bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userData: IUser = {
  name: 'Jeff',
  email: 'jeff@gmail.com',
  password: 'password',
  friends: [],
  itineraryIds: [],
  noteIds: [],
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
