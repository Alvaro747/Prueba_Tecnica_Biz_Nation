import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});


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
