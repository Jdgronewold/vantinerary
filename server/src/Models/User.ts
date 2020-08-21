import mongoose from 'mongoose';
import { IUser } from '../Types';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  _id: String
});
 
export const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);