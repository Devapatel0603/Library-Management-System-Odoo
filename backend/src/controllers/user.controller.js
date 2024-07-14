import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import { uploadImage } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { response } from "express";

// Login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ErrorHandler("Email & Password is required", 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ErrorHandler("Invalid Email or Password", 401);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ErrorHandler("Invalid Password", 401);
    }

    sendToken(user, 200, res);
});

//Register user
const register = asyncHandler(async (req, res, next) => {
    const {
        name,
        email,
        phone,
        line1,
        city,
        state,
        country,
        pincode,
        password,
    } = req.body;

    if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !line1 ||
        !state ||
        !country ||
        !pincode ||
        !city
    ) {
        throw new ErrorHandler("Please, provide all details", 400);
    }

    if (pincode.toString().length < 6) {
        throw new ErrorHandler("Pincode length must be 6 characters", 400);
    }

    if (password.length < 8) {
        throw new ErrorHandler(
            "Password length must be atleast 8 characters",
            400
        );
    }

    const existedUser = await User.findOne({
        email: email,
    });

    if (existedUser) {
        throw new ErrorHandler("User already exists", 400);
    }

    let profile_photo;
    if (!req.file) {
        profile_photo =
            "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";
    } else {
        profile_photo = await uploadImage(req.file);
    }

    const user = await User.create({
        name,
        email,
        phone,
        line1,
        city,
        state,
        country,
        pincode,
        profile_photo,
        password,
    });
    sendToken(user, 201, res);
});

//Google Login
const googleLogin = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new ErrorHandler("Name and email are required", 400);
    }

    let user = await User.findOne({ email });

    if (!user) {
        const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);

        user = await User.create({
            name,
            email,
            password: generatedPassword,
            isAdmin: email === "dev@gmail.com",
        });

        sendToken(user, 200, res);
    }

    sendToken(user, 200, res);
});

//Logout User
const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out!!",
    });
});

//Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }

    const resetToken = await user.getPasswordResetToken();

    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/setting/password/reset/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of the password for your account.Please click on the following link to reset your password: ${resetPasswordUrl} If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Email",
            message,
        });

        res.status(200).json({
            success: true,
            message: "Email Sent successfully !!",
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        throw new ErrorHandler(err.message, 500);
    }
});

//Verify Reset Password Token
const verifyResetPasswordToken = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new ErrorHandler("Invalid Token", 400);
    }

    res.status(200).json({
        success: true,
    });
});

//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new ErrorHandler("Invalid Token", 400);
    }

    if (req.body.password.length < 8) {
        throw new ErrorHandler(
            "Passwords should atleast contains 8 characters",
            400
        );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Get user
const getUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        throw new ErrorHandler("You are not logged in", 200);
    }

    const _id = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user) {
        throw new ErrorHandler("Token Expired", 200);
    }
    res.status(200).json({
        success: true,
        user,
    });
});

export {
    login,
    register,
    googleLogin,
    forgotPassword,
    resetPassword,
    logout,
    getUser,
    verifyResetPasswordToken,
};
