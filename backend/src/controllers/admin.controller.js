import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import { uploadImage } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//Register Librarian
const registerLibrarian = asyncHandler(async (req, res) => {
    const register = asyncHandler(async (req, res, next) => {
        const { name, email, phone, line1, city, state, country, pincode } =
            req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !address ||
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

        await sendEmail({
            email: user.email,
            message,
            subject: "Library Management System",
        });

        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                line1: user.line1,
                state: user.state,
                city: user.city,
                state: user.state,
                profile_photo: user.profile_photo,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    });
});
