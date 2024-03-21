import {AuthController} from "../../controllers/index";
import {UserLoginDto, UserRegisterDto} from "../../dtos/index";
import {IUserLogin, IUserRegister} from "../../interfaces/index";
import {validationBodyMiddleware} from "../../middlewares/index";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in to the application
 *     description: This route is used to log in to the application.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: If the credentials are correct
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: Login successful
 *               result:
 *                 token: yourAccessToken
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 400
 *               message: Invalid email or password
 *               result: null
 */
router.post(
  "/login",
  validationBodyMiddleware<IUserLogin>(UserLoginDto),
  AuthController.login
);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - student
 *       example:
 *         fullName: John Doe
 *         dateOfBirth: 1990-01-01
 *         email: johndoe@example.com
 *         password: password123
 *         role: student
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This route is used to register a new user in the application.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel'
 *     responses:
 *       200:
 *         description: If the registration is successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: Registration successful
 *               result: null
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 400
 *               message: Email already exists
 *               result: null
 */
router.post(
  "/register",
  validationBodyMiddleware<IUserRegister>(UserRegisterDto),
  AuthController.register
);

export default router;
