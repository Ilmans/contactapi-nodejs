import express from "express";
import userController from "../controllers/userController.js";

const publicRouter = express.Router();

publicRouter.post("/api/users", userController.register);

export { publicRouter };
