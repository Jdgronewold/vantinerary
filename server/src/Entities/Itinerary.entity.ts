// import mongoose from 'mongoose';
// import { Itinerary } from '../Types/Itinerary'

import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from './User.entity'


// const tripLegSchema = new mongoose.Schema({
//   origin: { lat: Number, lng: Number, name: String },
//   destination: { lat: Number, lng: Number, name: String },
//   distance: String,
//   time: String,
//   overviewPolyline: String,
//   arrivalDate: Date,
//   departureDate: Date
// }, {_id: false})

// export const itinerarySchema = new mongoose.Schema<Itinerary>({
//   authorId: String,
//   tripLegs: [tripLegSchema],
//   title: String,
//   notes: String
// })

// export const itineraryModel = mongoose.model<Itinerary & mongoose.Document>('Itinerary', itinerarySchema)

@Entity()
export class ItineraryEntity {
  @PrimaryGeneratedColumn()
  public id?: string;

  @OneToMany(() => TripLegEntity, tripLeg => tripLeg.itinerary, { cascade: true })
  tripLegs!: TripLegEntity[];

  @ManyToOne(() => UserEntity, user => user.itineraries, { cascade: true })
  user!: UserEntity

  @Column()
  public title!: string
// 
  @Column()
  public notes!: string
}

@Entity()
export class TripLegEntity {

  @PrimaryGeneratedColumn()
  public id?: string;

  @Column()
  public distance!: string

  @Column()
  public time!: string

  @Column()
  public overviewPolyline!: string

  @Column()
  public arrivalDate!: Date

  @Column()
  public departureDate!: Date

  @Column("simple-json")
  public origin!: { lat: number, lng: number, name: string }

  @Column("simple-json")
  public destination!: { lat: number, lng: number, name: string }

  @ManyToOne(() => ItineraryEntity, itinerary => itinerary.tripLegs, { cascade: true })
  itinerary!: ItineraryEntity

}