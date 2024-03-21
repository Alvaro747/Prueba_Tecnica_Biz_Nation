import {Request} from "express";

import {UserRole} from "../../enums/user-role.enum";

export default interface IRequestUserData extends Request {
  userData?: {
    email: string;
    role?: UserRole;
    deletedAt?: Date;
    fullName?: string;
    id?: number;
    updatedAt?: Date;
  };
}
