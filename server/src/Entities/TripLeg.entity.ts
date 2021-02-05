import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ItineraryEntity } from './Itinerary.entity'

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

  @ManyToOne(() => ItineraryEntity, itinerary => itinerary.tripLegs)
  itinerary!: ItineraryEntity

}