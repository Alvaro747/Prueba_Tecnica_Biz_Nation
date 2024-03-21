import {Request, Response, NextFunction} from "express";

import {UserRole} from "../../enums/user-role.enum";
import {IResponseHttp} from "../../interfaces/index";
import {createResponseHttp} from "../../utils/create-response-http";

export default function VerifyUserRoleMiddleware(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // varify if the user has a role and if it's allowed
    const userRole = req.body.role as UserRole;

    if (!userRole || !allowedRoles.includes(userRole)) {
      const response: IResponseHttp<null> = createResponseHttp<null>(
        403,
        "doesn't have permission to access this route.",
        false,
        null
      );
      return res.status(response.status).json(response);
    }

    // if the user has a role and it's allowed, then it continues to the next middleware
    next();
  };
}
