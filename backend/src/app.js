import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

//User routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

//Admin routes
import adminRoutes from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRoutes);

//Books routes
import bookRoutes from "./routes/book.routes.js";
app.use("/api/v1", bookRoutes);

app.use(errorHandler);

export { app };
