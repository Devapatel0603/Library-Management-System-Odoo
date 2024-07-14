import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
    path: "./.env",
});

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (localFile) => {
    try {
        console.log("................. : ", localFile);
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(localFile.path, {
            resource_type: "auto",
        });

        // Capture the URL of the uploaded image
        const imageUrl = uploadResult.secure_url;

        console.log(imageUrl);

        fs.unlinkSync(localFile.path);

        // Return the URL of the uploaded image
        return imageUrl;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFile.path);
        return null;
    }
};
