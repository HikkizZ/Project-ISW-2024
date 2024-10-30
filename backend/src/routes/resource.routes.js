import { Router } from "express";
import { createResource, getResources, getResource, updateResource, deleteResource } from "../controllers/resource.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post("/", verifyRole("Encargado"), createResource) // Crear un recurso
    .get("/all", getResources) // Listar recursos (disponibles y no disponibles)
    .patch("/detail/", verifyRole("Encargado"), updateResource) // Actualizar recurso
    .get("/detail/", getResource) // Mostrar información de un recurso en particular
    .delete("/detail/", verifyRole("Encargado"), deleteResource); // Eliminar un recurso

export default router;