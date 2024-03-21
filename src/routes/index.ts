import express from 'express';
import AuthRoutes from './auth/auth.routes';

const router = express.Router();

router.use('/auth', AuthRoutes);

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
