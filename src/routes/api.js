import express from "express";
import userController from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import contactController from "../controllers/contactController.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// userAPI
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// contact api
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);

export { userRouter };
