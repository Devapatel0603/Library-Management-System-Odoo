import { Router } from "express";
import {
    login,
    forgotPassword,
    resetPassword,
    logout,
    getUser,
    verifyResetPasswordToken,
    register,
    googleLogin,
} from "../controllers/user.controller.js";
import { isLoggedin } from "../middlewares/isLoggedin.middleware.js";

const router = Router();

//Login
router.route("/login").post(login);

//Register
router.route("/register").post(register);

//Google Login
router.route("/google/login").post(googleLogin);

//Logout
router.route("/logout").get(isLoggedin, logout);

//Get User
router.route("/get").get(getUser);

//Forgot Password
router.route("/forgot/password").post(forgotPassword);

//Reset Password
router.route("/reset/password/:token").post(resetPassword);

//Verify reset password token
router.route("/verify/reset/:token").get(verifyResetPasswordToken);

export default router;
