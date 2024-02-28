import * as SubCategoryServices from "../service/sub-category-service.js";
import {saveSubCategory} from "../service/sub-category-service.js";

export const createSubCategory = async (req, res, next) => {
    try {
        const result = await SubCategoryServices.saveSubCategory(req.body);
        res.status(200).json({
            data: result,
            message: "Create Success"
        });
    } catch (e) {
        next(e);
    }
}

export const updateSubCategory = async (req, res, next) => {
    try {
        req.body.id = req.params.id
        const result = await SubCategoryServices.saveSubCategory(req.body);
        res.status(200).json({
            data: result,
            message: "Update Success"
        });
    } catch (e) {
        next(e);
    }
}

export const getSubCategory = async (req, res, next) => {
    try {
        const result = await SubCategoryServices.getAll(req.query);
        res.status(200).json({
            data: result,
            message: "success"
        });
    } catch (e) {
        next(e);
    }
}

export const getDetailSubCategory = async (req, res, next) => {
    try {
        const result = await SubCategoryServices.getDetail(req.params.id);
        res.status(200).json({
            data: result,
            message: "success"
        });
    } catch (e) {
        next(e);
    }
}
export const deleteSubCategory = async (req, res, next) => {
    try {
        const result = await SubCategoryServices.del(req.params.id);
        res.status(200).json({
            data: result,
            message: "success"
        });
    } catch (e) {
        next(e);
    }
}