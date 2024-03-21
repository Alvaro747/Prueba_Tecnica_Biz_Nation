import {AuthController} from "../../controllers/index";
import {UserLoginDto, UserRegisterDto} from "../../dtos/index";
import {IUserLogin, IUserRegister} from "../../interfaces/index";
import {validationBodyMiddleware} from "../../middlewares/index";
import express from "express";

const router = express.Router();

router.post(
  "/login",
  validationBodyMiddleware<IUserLogin>(UserLoginDto),
  AuthController.login
);

router.post(
  "/register",
  validationBodyMiddleware<IUserRegister>(UserRegisterDto),
  AuthController.register
);

export default router;
