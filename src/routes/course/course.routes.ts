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

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Operations related to courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseCreateDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The ID of the course
 *         logo:
 *           type: string
 *           description: The logo of the course
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         publicationDate:
 *           type: string
 *           format: date
 *           description: The publication date of the course
 *         introductoryVideo:
 *           type: string
 *           description: The introductory video of the course
 *         lessonsAssociated:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Lesson'
 *           description: The lessons associated with the course
 *       example:
 *         id: 1
 *         logo: "example_logo.png"
 *         title: "Example Course"
 *         description: "This is an example course"
 *         publicationDate: "2024-03-21"
 *         introductoryVideo: "example_intro_video.mp4"
 *         lessonsAssociated:
 *           - title: "Lesson 1"
 *             description: "Introduction to the course"
 *             video: "https://example.com/lesson1.mp4"
 *             courseId: 1
 *           - title: "Lesson 2"
 *             description: "Advanced concepts"
 *             video: "https://example.com/lesson2.mp4"
 *             courseId: 1
 *     Lesson:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The ID of the lesson
 *         title:
 *           type: string
 *           description: The title of the lesson
 *         description:
 *           type: string
 *           description: The description of the lesson
 *         video:
 *           type: string
 *           description: The video URL of the lesson
 *         courseId:
 *           type: number
 *           description: The ID of the associated course
 *       example:
 *         id: 1
 *         title: "Lesson 1"
 *         description: "Introduction to the course"
 *         video: "https://example.com/lesson1.mp4"
 *         courseId: 1
 */

/**
 * @swagger
 *  /api/courses/create:
 *   post:
 *     summary: Create a new course
 *     description: This route is used to create a new course.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseCreateDto'
 *     responses:
 *       200:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: Course created successfully
 *               result: null
 *       401:
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 401
 *               message: Unauthorized - Invalid token
 *               result: null
 *       403:
 *         description: Forbidden - Insufficient privileges
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 403
 *               message: Forbidden - Insufficient privileges
 *               result: null
 *       422:
 *         description: Unprocessable Entity - Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 422
 *               message: Unprocessable Entity - Validation error
 *               result: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               message: Internal Server Error
 *               result: null
 */
router.post(
  "/create",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  validationBodyMiddleware<ICourseCreate>(CourseCreateDto),
  CourseController.create
);

/**
 * @swagger
 *  /api/courses:
 *   get:
 *     summary: Get list of courses
 *     description: This route is used to get a list of courses.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: List of courses retrieved successfully
 *               result: // Include list of courses here
 *       401:
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 401
 *               message: Unauthorized - Invalid token
 *               result: null
 *       403:
 *         description: Forbidden - Insufficient privileges
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 403
 *               message: Forbidden - Insufficient privileges
 *               result: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               message: Internal Server Error
 *               result: null
 */
router.get(
  "/",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN, UserRole.STUDENT]),
  CourseController.getCoursesList
);

/**
 * @swagger
 *  /api/courses/detail/{id}:
 *   get:
 *     summary: Get course details by ID
 *     description: This route is used to get details of a specific course by its ID.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: Course details retrieved successfully
 *               result: {}
 *       401:
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 401
 *               message: Unauthorized - Invalid token
 *               result: null
 *       403:
 *         description: Forbidden - Insufficient privileges
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 403
 *               message: Forbidden - Insufficient privileges
 *               result: null
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 404
 *               message: Course not found
 *               result: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               message: Internal Server Error
 *               result: null
 */
router.get(
  "/detail/:id",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN, UserRole.STUDENT]),
  CourseController.detail
);

/**
 * @swagger
 *  /api/courses/add-lessons:
 *   post:
 *     summary: Add lessons to a course
 *     description: This route is used to add lessons to a course.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course to which lessons will be added
 *               lessons:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of lesson IDs to be added to the course
 *     responses:
 *       200:
 *         description: Lessons added to the course successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: Lessons added to the course successfully
 *               result: null
 *       401:
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 401
 *               message: Unauthorized - Invalid token
 *               result: null
 *       403:
 *         description: Forbidden - Insufficient privileges
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 403
 *               message: Forbidden - Insufficient privileges
 *               result: null
 *       422:
 *         description: Unprocessable Entity - Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 422
 *               message: Unprocessable Entity - Validation error
 *               result: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               message: Internal Server Error
 *               result: null
 */

router.post(
  "/add-lessons",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.addLessons
);

/**
 * @swagger
 *  /api/courses/{id}:
 *   patch:
 *     summary: Update course by ID
 *     description: This route is used to update a course by its ID.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: Course updated successfully
 *               result: null
 *       401:
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 401
 *               message: Unauthorized - Invalid token
 *               result: null
 *       403:
 *         description: Forbidden - Insufficient privileges
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 403
 *               message: Forbidden - Insufficient privileges
 *               result: null
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 404
 *               message: Course not found
 *               result: null
 *       422:
 *         description: Unprocessable Entity - Validation error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 422
 *               message: Unprocessable Entity - Validation error
 *               result: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               message: Internal Server Error
 *               result: null
 */
router.patch(
  "/:id",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.update
);

/**
 * @swagger
 *  /api/courses:
 *   delete:
 *     summary: Delete all courses
 *     description: This route is used to delete all courses.
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All courses deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               status: 200
 *               message: All courses deleted successfully
 *               result: null
 *       401:
 *         description: Unauthorized - Invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 401
 *               message: Unauthorized - Invalid token
 *               result: null
 *       403:
 *         description: Forbidden - Insufficient privileges
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 403
 *               message: Forbidden - Insufficient privileges
 *               result: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               status: 500
 *               message: Internal Server Error
 *               result: null
 */
router.delete(
  "/",
  verifyTokenMiddleware,
  getUserRoleByEmailMiddleware,
  VerifyUserRoleMiddleware([UserRole.ADMIN]),
  CourseController.delete
);

export default router;
