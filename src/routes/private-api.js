import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware)
privateRouter.post("/api/users/refresh-token", userController.refreshToken);
privateRouter.post("/api/users/logout", userController.logout);
privateRouter.get("/api/users", userController.getList);
privateRouter.get("/api/users/:id", userController.detail);
privateRouter.delete("/api/users/:id", userController.del);
privateRouter.put("/api/users/:id", userController.update);

export { privateRouter };
