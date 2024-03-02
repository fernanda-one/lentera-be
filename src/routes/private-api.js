import express from "express";
import userController from "../controller/user-controller.js";
import * as roleController from "../controller/role-controller.js";
import * as positionController from "../controller/position-controller.js";
import * as categoryController from "../controller/category-controller.js";
import * as subCategoryController from "../controller/sub-category-controller.js";
import * as contentController from "../controller/content-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRouter = new express.Router();
privateRouter.use(authMiddleware)
privateRouter.post("/api/users/refresh-token", userController.refreshToken);
privateRouter.post("/api/users/logout", userController.logout);
privateRouter.get("/api/users", userController.getList);
privateRouter.get("/api/users/:id", userController.detail);
privateRouter.delete("/api/users/:id", userController.del);
privateRouter.put("/api/users/:id", userController.update);

// Role

privateRouter.post("/api/roles", roleController.createRole);
privateRouter.put("/api/roles/:id", roleController.updateRole);
privateRouter.get("/api/roles/:id", roleController.getAllRoles);
privateRouter.delete("/api/roles/:id", roleController.delRole);
privateRouter.get("/api/roles", roleController.getAllRoles);


// Position

privateRouter.post("/api/positions", positionController.createPosition);
privateRouter.put("/api/positions/:id", positionController.updatePosition);
privateRouter.get("/api/positions/:id", positionController.getAllPositions);
privateRouter.delete("/api/positions/:id", positionController.delPosition);
privateRouter.get("/api/positions", positionController.getAllPositions);
// Category

privateRouter.post("/api/categories", categoryController.createCategory);
privateRouter.put("/api/categories/:id", categoryController.updateCategory);
privateRouter.get("/api/categories/:id", categoryController.getDetailCategory);
privateRouter.delete("/api/categories/:id", categoryController.deleteCategory);
privateRouter.get("/api/categories", categoryController.getCategory);
// Sub Category

privateRouter.post("/api/sub_categories", subCategoryController.createSubCategory);
privateRouter.put("/api/sub_categories/:id", subCategoryController.updateSubCategory);
privateRouter.get("/api/sub_categories/:id", subCategoryController.getDetailSubCategory);
privateRouter.delete("/api/sub_categories/:id", subCategoryController.deleteSubCategory);
privateRouter.get("/api/sub_categories", subCategoryController.getSubCategory);
// Sub Category
//
privateRouter.post("/api/content", contentController.createContent);
privateRouter.put("/api/content/:id", contentController.updateContent);
privateRouter.get("/api/content/:id", contentController.getAllContents);
privateRouter.delete("/api/content/:id", contentController.delContent);
privateRouter.get("/api/content", contentController.getAllContents);

export { privateRouter };
