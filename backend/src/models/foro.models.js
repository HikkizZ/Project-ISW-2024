import { EntitySchema } from "typeorm";

const ForoSchema = new EntitySchema({
    name: "Foro",
    tableName: "foros",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        // Título del foro
        titulo: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        // ID del profesor que creó el foro
        profesorId: {
            type: 'int',
        },
        // Nombre del profesor que creó el foro
        profesorNombre: {
            type: 'varchar',
            length: 255,
            nullable: true,
        },
        // RUT del profesor que creó el foro
        profesorRut: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        // Categoría del foro
        categoria: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        // Contenido principal del foro
        contenido: {
            type: 'varchar',
            length: 10000,
            nullable: false,
        },
        // Fecha de creación del foro (se genera automáticamente)
        fechaCreacion: {
            type: 'timestamp',
            createDate: true,
        },
        // Fecha de última actualización del foro (se actualiza automáticamente)
        fechaActualizacion: {
            type: 'timestamp',
            createDate: true,
            updateDate: true,
        },
        // Archivos adjuntos al foro (almacenados como JSON)
        archivosAdjuntos: {
            type: 'simple-json',
            nullable: true,
        },
        // Nivel del curso asociado al foro
        level: {
            type: 'int',
            nullable: false,
        },
        // Sección del curso asociado al foro
        section: {
            type: 'varchar',
            length: 1,
            nullable: false,
        },
    },
    relations: {
        // Relación con el usuario profesor
        profesor: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "profesorId",
                referencedColumnName: "id"
            },
            where: { role: 'Profesor' }
        },
        // Relación con el curso
        curso: {
            target: "Curso",
            type: "many-to-one",
            joinColumn: {
                name: "cursoId",
                referencedColumnName: "id"
            }
        },
    },
    indices: [
        // Índice para optimizar las búsquedas por ID
        {
            name: "IDX_FORO",
            columns: ["id"],
            unique: true,
        },
    ],
});

export default ForoSchema;