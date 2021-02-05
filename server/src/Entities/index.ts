import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

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


@Entity()
export class ItineraryEntity {
  @PrimaryGeneratedColumn()
  public id?: string;

  @OneToMany(() => TripLegEntity, tripLeg => tripLeg.itinerary, { cascade: true, onDelete: 'CASCADE' })
  tripLegs!: TripLegEntity[];

  @ManyToOne(() => UserEntity, user => user.itineraries, { cascade: ["insert" || "update"] })
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

  @ManyToOne(() => ItineraryEntity, itinerary => itinerary.tripLegs, { onDelete: 'CASCADE' })
  itinerary!: ItineraryEntity

}

@Entity()
export class NoteEntity {

  @PrimaryGeneratedColumn()
  public id?: string;

  @Column()
  public body!: string

  @Column()
  public title!: string

  @Column()
  public location!: string

  @Column()
  public date!: Date

  @Column()
  public showOnCalendar!: boolean

  @ManyToOne(() => UserEntity, user => user.notes, { cascade: ["insert" || "update"] })
  user!: UserEntity

}
