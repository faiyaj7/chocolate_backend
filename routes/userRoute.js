import express from "express";
import { createNewUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/new", createNewUser);
router.post("/authorize", loginUser);
export default router;
