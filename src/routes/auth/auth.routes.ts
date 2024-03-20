import express from "express";

const router = express.Router();

router.post("/login", () => {
  console.log("Hello World!");
});

router.post("/register", () => {
  console.log("Hello World!");
});

export default router;
