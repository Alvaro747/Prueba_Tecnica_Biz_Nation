import {Request, Response, NextFunction} from "express";

import Repository from "../../models";
import {IResponseHttp} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";

export default async function getUserRoleByEmailMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await Repository.UserModel.findOne({
      where: {email: req.body.email},
      attributes: {exclude: ["password"]},
    });

    if (!user) {
      const response: IResponseHttp<null> = createResponseHttp<null>(
        404,
        "User not found.",
        false,
        null
      );
      return res.status(response.status).json(response);
    }

    // save the user into req.body to use it in the next middleware
    req.body = user.dataValues;
    next();
  } catch (error) {
    const response: IResponseHttp<null> = createResponseHttp<null>(
      500,
      "Internal server error when trying to get user role.",
      false,
      null
    );
    return res.status(response.status).json(response);
  }
}
