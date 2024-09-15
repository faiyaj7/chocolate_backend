import { createToken } from "./auth.js";
import dotenv from "dotenv";
dotenv.config();
export const sendToken = (user, statusCode, res) => {
  const token = createToken(user);  
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_DURATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
