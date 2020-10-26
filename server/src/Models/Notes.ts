import mongoose from 'mongoose';
import { INote } from '../Types'

const noteSchema = new mongoose.Schema({
  body: String,
  date: Date,
  location: String,
  showOnCalendar: Boolean,
  tag: Object
});

export const noteModel = mongoose.model<INote & mongoose.Document>('Note', noteSchema)