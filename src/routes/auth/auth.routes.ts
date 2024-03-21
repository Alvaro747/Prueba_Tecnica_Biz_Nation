import {AuthController} from "../../controllers/index";
import {UserRegisterDto} from "../../dtos/index";
import {IUserRegister} from "../../interfaces/index";
import {validationBodyMiddleware} from "../../middlewares/index";
import express from "express";

const router = express.Router();

router.post("/login", () => {
  console.log("Hello World!");
});

router.post(
  "/register",
  validationBodyMiddleware<IUserRegister>(UserRegisterDto),
  AuthController.register
);

export default router;
