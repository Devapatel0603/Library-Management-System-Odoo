import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [validator.isEmail, "Please, enter valid email"],
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: [
                validator.isMobilePhone,
                "Please, enter valid mobile number",
            ],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "examiner", "invigilator"],
            default: "invigilator",
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpire: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password reset Token
userSchema.methods.getPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 5,
    });
};

const User = mongoose.model("User", userSchema);

export { User };
