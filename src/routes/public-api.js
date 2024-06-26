import express from "express";
import userController from "../controller/user-controller.js";
import * as categoryController from "../controller/category-controller.js";
import * as subCategoryController from "../controller/sub-category-controller.js";
import * as contentController from "../controller/content-controller.js";
import * as roleController from "../controller/role-controller.js";
import * as positionController from "../controller/position-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/login", userController.login);
publicRouter.get("/", async (req, res, next) => {
  res.status(200).json({
    message: "success",
  });
});

// Category

publicRouter.get("/api/categories/:id", categoryController.getDetailCategory);
publicRouter.get("/api/categories", categoryController.getCategory);
// Sub Category

publicRouter.get(
  "/api/sub_categories/:id",
  subCategoryController.getDetailSubCategory
);
publicRouter.get("/api/sub_categories", subCategoryController.getSubCategory);
// Content

publicRouter.get("/api/content/:id", contentController.getAllContents);
publicRouter.get("/api/content", contentController.getAllContents);

publicRouter.get("/api/roles/:id", roleController.getAllRoles);
publicRouter.get("/api/roles", roleController.getAllRoles);

publicRouter.get("/api/positions/:id", positionController.getAllPositions);
publicRouter.get("/api/positions", positionController.getAllPositions);

publicRouter.get("/api/content/:id", contentController.getAllContents);
publicRouter.get("/api/content", contentController.getAllContents);

export { publicRouter };
