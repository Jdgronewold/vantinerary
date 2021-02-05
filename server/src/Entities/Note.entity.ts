// // import mongoose from 'mongoose';
// // import { INote } from '../Types'

// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { UserEntity } from './User.entity';


// // const noteSchema = new mongoose.Schema({
// //   authorId: String,
// //   body: String,
// //   title: String,
// //   date: Date,
// //   location: String,
// //   showOnCalendar: Boolean,
// //   tag: Object
// // });

// // export const noteModel = mongoose.model<INote & mongoose.Document>('Note', noteSchema)

// @Entity()
// export class NoteEntity {

//   @PrimaryGeneratedColumn()
//   public id?: string;

//   @Column()
//   public body!: string

//   @Column()
//   public title!: string

//   @Column()
//   public location!: string

//   @Column()
//   public date!: Date

//   @Column()
//   public showOnCalendar!: boolean

//   // @ManyToOne(() => UserEntity, user => user.notes, { cascade: true })
//   // user!: UserEntity

// }