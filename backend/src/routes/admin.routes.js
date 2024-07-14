import { Router } from "express";
import {
    registerLibrarian,
} from "../controllers/admin.controller.js";
import { authorizeRole } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//Register librarian
router.route("/register").post(authorizeRole("admin"), upload.single("profile_photo"), registerLibrarian);

export default router;