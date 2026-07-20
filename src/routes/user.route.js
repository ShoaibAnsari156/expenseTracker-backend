import { Router } from "express";
import { createUser, getUserProfile, loginUser, logoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../utils/authMiddleware.js";
const userRouter = Router();

userRouter.route("/register").post(createUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);
userRouter.route("/:userId/profile").get(authMiddleware,getUserProfile);
export default userRouter;