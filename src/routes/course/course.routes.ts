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

// Operación READ (obtener todos los elementos)
router.get(
  "/detail/:id",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN, UserRole.STUDENT]),
  CourseController.detail
);

router.post(
  "/add-lessons",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.addLessons
);

// Operación UPDATE
router.patch(
  "/:id",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.update
);

// Operación DELETE
router.delete(
  "/",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.delete
);

export default router;
