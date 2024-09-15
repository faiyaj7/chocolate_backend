import { asyncTryCatch } from "../middleware/promiseHandling.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../utils/ErrorHandler.js";

import { sendToken } from "../utils/jwtToken.js";

export const createNewUser = asyncTryCatch(async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) return next(new ErrorHandler("Email already exists", 401));
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  await newUser.save();
  res.status(200).json({ newUser });
});

export const loginUser = asyncTryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  const emailExists = await User.findOne({ email }).select("+password");

  if (!emailExists) return next(new ErrorHandler("Wrong Credentials", 401));

  const passwordMatch = await bcrypt.compare(password, emailExists.password);
  if (!passwordMatch) return next(new ErrorHandler("Wrong Credentials", 401));
  const user = await User.findOne({ email });

  sendToken(user, 200, res);
  res.status(200).json(user);
});
