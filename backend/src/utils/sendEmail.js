import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD,
        },
    });

    const mailOption = {
        from: "Dev <dev553949@gmail.com>",
        to: [options.email],
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOption);
};

export { sendEmail };
