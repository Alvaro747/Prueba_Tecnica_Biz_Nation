import {Request, Response} from "express";

import {AuthService} from "../../services/index";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const response = await AuthService.login(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async register(req: Request, res: Response) {
    const response = await AuthService.register(req.body);
    res.status(response?.status || 201).json(response);
  }
}
