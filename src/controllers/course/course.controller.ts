import {Request, Response} from "express";
import {CourseService} from "../../services/index";

export default class CourseController {
  static async create(req: Request, res: Response) {
    const response = await CourseService.create(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async read(req: Request, res: Response) {
    const response = await CourseService.create(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async addLessons(req: Request, res: Response) {
    const response = await CourseService.addLessons(req.body);
    res.status(response?.status || 201).json(response);
  }

  static async update(req: Request, res: Response) {
    const {id} = req.params;
    const idNumber = parseInt(id as string);
    const response = await CourseService.update(idNumber, req.body);
    res.status(response?.status || 201).json(response);
  }

  static async delete(req: Request, res: Response) {
    const response = await CourseService.create(req.body);
    res.status(response?.status || 201).json(response);
  }
}
