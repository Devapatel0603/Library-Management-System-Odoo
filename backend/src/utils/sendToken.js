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
};

export { sendToken };
