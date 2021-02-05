import { ConnectionOptions } from 'typeorm';
import { ItineraryEntity, UserEntity, NoteEntity } from './Entities'
 
export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [
    // __dirname + '/Entities/*.entity{.js}',
    ItineraryEntity, NoteEntity, UserEntity
  ],
  synchronize: true,
};
