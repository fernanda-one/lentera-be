import * as categoryServices from "../service/category-service.js";

export const createCategory = async (req, res, next) => {
    try {
        const result = await categoryServices.saveCategory(req.body);
        res.status(200).json({
            data: result,
            message: "Create Success"
        });
    } catch (e) {
        next(e);
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        req.body.id = req.params.id
        const result = await categoryServices.saveCategory(req.body);
        res.status(200).json({
            data: result,
            message: "Update Success"
        });
    } catch (e) {
        next(e);
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const result = await categoryServices.getAll(req.query);
        res.status(200).json({
            data: result,
            message: "success"
        });
    } catch (e) {
        next(e);
    }
}

export const getDetailCategory = async (req, res, next) => {
    try {
        const result = await categoryServices.getDetail(req.params.id);
        res.status(200).json({
            data: result,
            message: "success"
        });
    } catch (e) {
        next(e);
    }
}
export const deleteCategory = async (req, res, next) => {
    try {
        const result = await categoryServices.del(req.params.id);
        res.status(200).json({
            data: result,
            message: "success"
        });
    } catch (e) {
        next(e);
    }
}