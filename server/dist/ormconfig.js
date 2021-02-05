"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entities_1 = require("./Entities");
exports.config = {
    type: 'postgres',
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [
        // __dirname + '/Entities/*.entity{.js}',
        Entities_1.ItineraryEntity, Entities_1.NoteEntity, Entities_1.UserEntity
    ],
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map