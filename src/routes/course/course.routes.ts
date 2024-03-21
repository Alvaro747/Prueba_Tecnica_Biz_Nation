import express from "express";
import { UserRole } from "../../enums/user-role.enum";
import {
  getUserRoleByEmailMiddleware,
  validationBodyMiddleware,
  verifyTokenMiddleware,
  VerifyUserRoleMiddleware,
} from "../../middlewares/index";
import { ICourseCreate } from "../../interfaces/index";
import { CourseCreateDto } from "../../dtos/index";
import { CourseController } from "../../controllers/index";

const router = express.Router();

// CREATE Operation
router.post(
  "/create",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  validationBodyMiddleware<ICourseCreate>(CourseCreateDto),
  CourseController.create
);

// READ Operation (get a specific item by its ID, for example)
router.get(
  "/",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN, UserRole.STUDENT]),
  CourseController.getCoursesList
);

// READ Operation (get by id)
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

// UPDATE Operation
router.patch(
  "/:id",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.update
);

// DELETE Operation
router.delete(
  "/",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.delete
);

export default router;