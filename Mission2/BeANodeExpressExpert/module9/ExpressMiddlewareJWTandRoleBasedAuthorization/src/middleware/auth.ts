import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //  console.log(roles);
      // console.log("This is Protected Route");
      // console.log(req.headers.authorization);

      //* check if the token exists
      //* verify the token
      //* find the user into database
      //* if the user active or not
      const token = req.headers.authorization;
      // console.log(token);
      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized Access!!",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;
      // console.log(decoded);
      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [decoded.email],
      );
      const user = userData.rows[0];
      // console.log(user);
      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
      if (!user.is_active) {
        res.status(403).json({
          success: false,
          message: "Forbidden!!",
        });
      }

      // console.log("Auth Role: ", user.role)
      console.log(roles);

      if (roles.length && !roles.includes(user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden!!, This Role has no access",
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
