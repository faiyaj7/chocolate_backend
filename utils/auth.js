import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import ErrorHandler from "./ErrorHandler.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn:
      new Date().getTime() +
      process.env.JWT_EXPIRES_DURATION * 24 * 60 * 60 * 1000, // Token expiration time
  });
};

// export const checkAdmin = async (req, res, next) => {
//   try {
//     // Get token from headers

//     // const token = req.headers.authorization.split(" ")[1];
//     // const { token } = req.cookies;
//     console.log(req.cookies);
//     // console.log(token);

//     // Verify the token
//     // const decoded = jwt.verify(token, JWT_SECRET);
//     // console.log(decoded);
//     // if (!decoded) {
//     //   return next(new ErrorHandler("Access Denied", 401));
//     // }

//     // const user = await User.findById(decoded.id);

//     // if (!user) {
//     //   return next(new ErrorHandler("User not found", 404));
//     // }

//     // if (!user.isAdmin) {
//     //   return next(new ErrorHandler("Access Denied", 404));
//     // }

//     // req.user = user; // Attach user to the request
//     // next(); // Proceed to the controller
//   } catch (error) {
//     console.error("Token verification error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

export const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler("No token provided", 401));
    }

    const token = authHeader.split(" ")[1]; // Extract token

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (!user.isAdmin) {
      return next(new ErrorHandler("Access Denied", 403)); // 403 for forbidden
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
