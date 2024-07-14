const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    res.status(statusCode)
        .cookie("token", token, { httpOnly: true })
        .json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                enrollment: user.enrollment,
                phone: user.phone,
                gender: user.gender,
            },
        });
};

export { sendToken };
