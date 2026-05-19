import config from "../config";
import type { RUser } from "../types";
import jwt from "jsonwebtoken";

export const signToken = (payload: RUser & { id: number }) => {
  // accessToken
  const accessToken = jwt.sign(payload, config.jwt_secret, {
    expiresIn: "1d",
  });

  // refreshToken
  const refreshToken = jwt.sign(payload, config.refresh_secret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
