import { ConnectionOptions } from 'typeorm';
import { UserEntity, ItineraryEntity, NoteEntity, TripLegEntity } from './Entities'
console.log(UserEntity);

 
export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [
    // __dirname + '/Entities/*.entity{.js}',
    ItineraryEntity, NoteEntity, UserEntity, TripLegEntity
  ],
  synchronize: true,
};
