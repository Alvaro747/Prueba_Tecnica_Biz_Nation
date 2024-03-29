import {Request, Response, NextFunction} from "express";

import Repository from "../../models";
import {IRequestUserData, IResponseHttp} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";

export default async function getUserRoleByEmailMiddleware(
  req: IRequestUserData,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await Repository.UserModel.findOne({
      where: {email: req?.userData?.email},
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

    // save the user into req.userData to use it in the next middleware
    req.userData = {
      ...user.dataValues,
    };
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
