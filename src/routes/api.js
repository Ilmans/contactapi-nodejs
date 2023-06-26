import express from "express";
import userController from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import contactController from "../controllers/contactController.js";
import addressController from "../controllers/addressController.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// userAPI
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// contact api
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);
userRouter.put("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);
userRouter.get("/api/contacts", contactController.search);

// adress api
userRouter.post("/api/contacts/:contactId/addresses", addressController.create);
userRouter.get(
  "/api/contacts/:contactId/adresses/:adressId",
  addressController.get
);
userRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController.update);
userRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.remove
);

export { userRouter };
