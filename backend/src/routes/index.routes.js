import { Router } from "express";

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

import gradeRoutes from './grade.routes.js';
import subjectRoutes from './subject.routes.js';
import cursoRoutes from './curso.routes.js';

import scheduleRoutes from './schedule.routes.js'; 
import periodRoutes from './period.routes.js';

import Room from './room.routes.js';
import Resource from './resource.routes.js';
import Reservation from './reservation.routes.js';
// Importando rutas
import actividadRoutes from './actividad.routes.js';
import foroRoutes from './foro.routes.js'; // Importando las rutas de foro (anuncios)

const router = Router(); //? Crea una nueva instancia del enrutador de express.

router
    .use('/user', userRoutes) //! http://localhost:3000/api/user
    .use('/auth', authRoutes) //! http://localhost:3000/api/auth
    .use('/schedule', scheduleRoutes) //! http://localhost:3000/api/schedule
    .use('/period', periodRoutes)  //! http://localhost:3000/api/period
    .use('/grade', gradeRoutes) //! http://localhost:3000/api/grade
    .use('/subject', subjectRoutes) //! http://localhost:3000/api/subject
    .use('/curso', cursoRoutes) //! http://localhost:3000/api/curso
    .use('/room', Room) //! http://localhost:3000/api/room
    .use('/resource', Resource) //! http://localhost:3000/api/resource
    .use('/reservation', Reservation) //! http://localhost:3000/api/reservation
    .use('/actividades', actividadRoutes) // Usamos /actividades directamente
    .use('/posts', foroRoutes); // Añadimos la ruta para los anuncios (foro)

// Exportando los enrutadores
export default router;
