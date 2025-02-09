// models/room.model.js
import { EntitySchema } from "typeorm";

const RoomSchema = new EntitySchema({
    name: "Room",
    tableName: "rooms",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,
        },
        capacity: { 
            type: "int", 
            nullable: false,
        },
        roomType: { 
            type: "enum",
            enum: ["laboratorio", "computacion", "clases"],
            nullable: false,
        },
    },
    relations:{
        horarios: { // Relación con Horario
            target: "Horario", 
            type: "one-to-many", 
            inverseSide: "room", 
            onDelete: "CASCADE", 
        },
    }
});

export default RoomSchema;
