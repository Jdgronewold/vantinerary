import { Pool } from 'pg'

interface Keys {
  pgUser: string,
  pgHost: string,
  pgDatabase: string,
  pgPassword: string,
  pgPort: number
}

const keys = {
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432
};

export const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});