import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    const { name, email, phone, address, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        throw new ErrorHandler("Please, provide all details", 400);
    }

    const existedUser = await User.findOne({
        email: email,
    });

    if (existedUser) {
        throw new ErrorHandler("User already exists", 400);
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        role: role.toLowerCase(),
    });

    const message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Odoo Combat Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            border-top: 8px solid #2563EB; /* blue-600 */
            overflow: hidden;
            position: relative;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background: linear-gradient(135deg, #2563EB, #1d4ea1);
            color: white;
            border-radius: 10px 10px 0 0;
            position: relative;
        }
        .header::after {
            content: '';
            display: block;
            width: 100%;
            height: 8px;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            position: absolute;
            bottom: -8px;
            left: 0;
        }
        h1 {
            margin: 0;
            font-size: 28px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
            margin: 15px 0;
        }
        .credentials {
            background: #f0faff;
            padding: 20px;
            border: 2px dashed #2563EB;
            border-radius: 10px;
            margin: 20px 0;
            position: relative;
        }
        .credentials::before {
            content: '';
            display: block;
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
            background-color: #2563EB;
            border-radius: 50%;
        }
        .credentials p {
            margin: 5px 0;
            font-weight: bold;
        }
        .credentials span {
            font-weight: normal;
        }
        .button {
            display: block;
            width: fit-content;
            margin: 20px auto;
            padding: 12px 24px;
            color: white;
            background: linear-gradient(135deg, #2563EB, #1d4ea1);
            border-radius: 50px;
            text-align: center;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        .button:hover {
            background: linear-gradient(135deg, #1d4ea1, #2563EB);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            transform: scale(1.05);
        }
        .divider {
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #2563EB, transparent);
            margin: 30px 0;
        }
        .footer {
            font-size: 14px;
            color: #666666;
            text-align: center;
            margin-top: 20px;
            padding: 20px 0;
            background: linear-gradient(135deg, #2563EB, #1d4ea1);
            color: white;
            border-radius: 0 0 10px 10px;
            position: relative;
        }
        .footer p {
            margin: 0;
            padding: 5px;
        }
        .footer a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
            display: inline-block;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .footer .socials {
            margin: 10px 0;
        }
        .footer .socials a {
            margin: 0 5px;
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #ffffff;
            color: #2563EB;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            text-decoration: none;
            transition: background 0.3s, color 0.3s;
        }
        .footer::before {
            content: '';
            display: block;
            width: 100%;
            height: 5px;
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            position: absolute;
            top: 0;
            left: 0;
        }
            img{
                width:100%;
            }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Odoo Combat!</h1>
        </div>
        <p>Dear ${name},</p>
        <p>We are thrilled to have you on board. Below are your account details:</p>
        <div class="credentials">
            <p><strong>Email:</strong> <span>${user.email}</span></p>
            <p><strong>Password:</strong> <span>${password}</span></p>
        </div>
        <p>You can now log in and start exploring our platform.</p>
        <a href="${
            process.env.FRONTEND_URL
        }" class="button" style="color:white;">Login Now</a>
        <div class="divider"></div>
        <p>Best regards,<br>The Odoo Combat Team</p>
        <div class="footer">
            <div class="socials">
            <a href="https://linkedin.com" title="LinkedIn">
                <img src="https://ci3.googleusercontent.com/meips/ADKq_NYtvcokpi4YMf5WB3QizMAkjRaM0od_NVH8dUccLghMigrCE7D5ODdAc96QQMBIxB-3yX0Hi-s97vg1boCpNzq6NvUT-xuspzbxeoR9yT9v2AJnTkSx1ei3nQRgmgM6xeJkNz0oTSHApQHWoSAevHnlVO2db7EEeyReAu4-LiXOYZJ0=s0-d-e1-ft#https://res.cloudinary.com/dyg30mfje/image/upload/v1683405186/Email/linkedin-logo-colored-bordered_sikhoj.png" />
            </a>
                <a href="https://instagram.com" title="Instagram">
                    <img src="https://ci3.googleusercontent.com/meips/ADKq_NYpeCh4jcNMrs1Fd9jqfQnB7sHOf9JuEwV2ZtD8jKED2Zl3_3BDjqurul4OWcWwJsK5pYw0eZ6S8k8dgDLZn9WyqVpRemzsWq_5lTTNsimEMU5Cc5rw39_Zgq-IeDLI4ccmcJGMtYH5Dg7IhLIuxZg3gN9piwkKJpEXXPNDTKeA_Otyog=s0-d-e1-ft#https://res.cloudinary.com/dyg30mfje/image/upload/v1683405186/Email/instagram-logo-colored-bordered_pnuwah.png" />
                </a>
                <a href="https://twitter.com" title="Twitter">
                    <img src="https://ci3.googleusercontent.com/meips/ADKq_NYog2sQjPtDJw5T6d6K4NdLld6oevCgRjssGVj03rbmUKl0xFoHI9iCkTBuUwlz1naiiTvmLyD5udaPO5-ZavrKEZTnwrOlbDup2sfI7Pd1jpPlx_D13sgHxiSTR8ujIU2Bj5oZVAp_xGEa-jzHU56NBwocDSg52Tp8hqcbs2vXtn4=s0-d-e1-ft#https://res.cloudinary.com/dyg30mfje/image/upload/v1683405187/Email/twitter-logo-colored-bordered_ssujl8.png" />
                </a>
            </div>
            <p><strong style="color:white;">&copy; ${new Date().getFullYear()} Odoo Combat. All rights reserved.</strong></p>
            <p>
                <a href="${process.env.FRONTEND_URL}">Visit our website</a> 
            </p>
        </div>
    </div>
</body>
</html>
`;

    await sendEmail({ email: user.email, message, subject: "Odoo Combat" });

    res.status(201).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    });
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
