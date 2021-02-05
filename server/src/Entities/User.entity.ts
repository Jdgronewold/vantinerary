// import mongoose from 'mongoose';
// import { IUser } from '../Types';

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ItineraryEntity, NoteEntity } from './index';
// import {  } from './Note.entity';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   friends: [String],
//   noteIds: [String],
//   itineraryIds: [String]
// });
 
// export const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  public id?: string;

  @Column()
  public email!: string

  @Column()
  public password!: string

  @OneToMany(() => ItineraryEntity, itinerary => itinerary.user, { cascade: true })
  itineraries!: ItineraryEntity[]

  @OneToMany(() => NoteEntity, note => note.user, { cascade: true })
  notes!: NoteEntity[]

}