import {Request, Response} from "express";
import {AuthService} from "../../services/index";

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const response = await AuthService.login(req.body );
      res.status(response?.status || 201).json(response);
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const response = await AuthService.register(req.body);
      res.status(response?.status || 201).json(response);
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }
}
