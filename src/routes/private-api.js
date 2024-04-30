import express from "express";
import userController from "../controller/user-controller.js";
import * as roleController from "../controller/role-controller.js";
import * as positionController from "../controller/position-controller.js";
import * as categoryController from "../controller/category-controller.js";
import * as subCategoryController from "../controller/sub-category-controller.js";
import * as contentController from "../controller/content-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {getAllRoles} from "../controller/role-controller.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);
privateRouter.post("/api/users/refresh-token", userController.refreshToken);
privateRouter.post("/api/users/logout", userController.logout);
privateRouter.get("/api/users", userController.getList);
privateRouter.get("/api/users/:id", userController.detail);
privateRouter.delete("/api/users/:id", userController.del);
privateRouter.put("/api/users/:id", userController.update);

// Role

privateRouter.post("/api/roles", roleController.createRole);
privateRouter.put("/api/roles/:id", roleController.updateRole);
privateRouter.delete("/api/roles/:id", roleController.delRole);
privateRouter.get("/api/roles", roleController.getAllRoles);
privateRouter.get("/api/roles/:id", roleController.getAllRoles);

// Position

privateRouter.post("/api/positions", positionController.createPosition);
privateRouter.put("/api/positions/:id", positionController.updatePosition);
privateRouter.delete("/api/positions/:id", positionController.delPosition);
// Category

privateRouter.post("/api/categories", categoryController.createCategory);
privateRouter.put("/api/categories/:id", categoryController.updateCategory);
privateRouter.delete("/api/categories/:id", categoryController.deleteCategory);
// Sub Category

privateRouter.post(
  "/api/sub_categories",
  subCategoryController.createSubCategory
);
privateRouter.put(
  "/api/sub_categories/:id",
  subCategoryController.updateSubCategory
);
privateRouter.delete(
  "/api/sub_categories/:id",
  subCategoryController.deleteSubCategory
);
// Content
//
privateRouter.post("/api/content", contentController.createContent);
privateRouter.put("/api/content/:id", contentController.updateContent);
privateRouter.delete("/api/content/:id", contentController.delContent);

export { privateRouter };
