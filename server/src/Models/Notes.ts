import mongoose from 'mongoose';
import { INote } from '../Types'

const noteSchema = new mongoose.Schema({
  authorId: String,
  body: String,
  title: String,
  date: Date,
  location: String,
  showOnCalendar: Boolean,
  tag: Object,
  _id: String
});

export const noteModel = mongoose.model<INote & mongoose.Document>('Note', noteSchema)