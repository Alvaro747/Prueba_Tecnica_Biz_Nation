import express from "express";
import {UserRole} from "../../enums/user-role.enum";
import {
  getUserRoleByEmailMiddleware,
  validationBodyMiddleware,
  verifyTokenMiddleware,
  VerifyUserRoleMiddleware,
} from "../../middlewares/index";
import {ICourseCreate} from "../../interfaces/index";
import {CourseCreateDto} from "../../dtos/index";
import {CourseController} from "../../controllers/index";

const router = express.Router();

// Operación CREATE
router.post(
  "/create",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  validationBodyMiddleware<ICourseCreate>(CourseCreateDto),
  CourseController.create
);

// Operación READ (obtener todos los elementos)
router.get("/", (req, res) => {
  // Aquí iría la lógica para obtener todos los elementos
});

// Operación READ (obtener un elemento específico por su ID, por ejemplo)
router.get("/:id", (req, res) => {
  // Aquí iría la lógica para obtener un elemento por su ID
});

// Operación UPDATE
router.patch("/:id", (req, res) => {
  // Aquí iría la lógica para actualizar un elemento por su ID
});

// Operación DELETE
router.delete("/:id", (req, res) => {
  // Aquí iría la lógica para eliminar un elemento por su ID
});

export default router;
