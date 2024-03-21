import express from 'express';
import AuthRoutes from './auth/auth.routes';
import CourseRoutes from './course/course.routes';

const router = express.Router();

router.use('/auth', AuthRoutes);

router.use("/courses", CourseRoutes);

export default router;


// create schema security component
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
