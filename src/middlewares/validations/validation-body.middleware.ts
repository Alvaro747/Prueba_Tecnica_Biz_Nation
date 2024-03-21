import {Request, Response, NextFunction} from "express";
import {validate} from "class-validator";
import {IResponseHttp} from "../../interfaces/index";

function validationBodyMiddleware<T>(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = new dtoClass(req.body as T);
      const errors = await validate(dtoInstance);
      if (errors.length > 0) {
        const validationErrors = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints || {}),
        }));
        const response: IResponseHttp<string[]> = {
          success: false,
          status: 400,
          message: "Validation error",
          result: validationErrors.map(
            (error) => `${error.field}: ${error.messages.join(", ")}`
          ),
        };
        return res.status(400).json(response);
      }
      req.body = dtoInstance; // Attach validated DTO to request object
      next();
    } catch (error) {
      console.error("Error in validation middleware:", error);
      const response: IResponseHttp<null> = {
        success: false,
        status: 500,
        message: "Internal server error",
        result: null,
      };
      return res.status(500).json(response);
    }
  };
}

export default validationBodyMiddleware;
