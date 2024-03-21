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

// Operación READ (obtener un elemento específico por su ID, por ejemplo)
router.get(
  "/",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN, UserRole.STUDENT]),
  CourseController.getCoursesList
);

// Operación READ (obtener por id)
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
