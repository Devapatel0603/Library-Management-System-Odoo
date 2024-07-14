import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(8000, () => {
            console.log("Server is running at port 8000");
        });
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED", error);
    });
