import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import {IDecodedToken, IResponseHttp} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";

export default function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  const token = header?.split(" ")[1];
  const tokenPrefix = header?.split(" ")[0];

  if (!token || tokenPrefix?.toLocaleLowerCase() !== "bearer") {
    const response: IResponseHttp<null> = createResponseHttp<null>(
      403,
      "No token provided or prefix is incorrect.",
      false,
      null
    );
    return res.status(response.status).json(response);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IDecodedToken;

    // save the email into req.body to use it in the next middleware
    req.body = {
      email: decoded.email,
    };
    next();
  } catch (error) {
    const response: IResponseHttp<null> = createResponseHttp<null>(
      401,
      "Failed to authenticate token.",
      false,
      null
    );
    return res.status(response.status).json(response);
  }
}
