import * as roleServices from "../service/role-service.js";

export const createRole = async (req, res, next) => {
    try {
        const result = await roleServices.saveRole(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const updateRole = async (req, res, next) => {
    try {
        req.body.id = req.params.id
        const result = await roleServices.saveRole(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const getAllRoles = async (req, res, next) => {
    try {
        let result
        if (req.params.id) {
            result = await roleServices.getDetail(req.params.id);
        } else {
            result = await roleServices.getAll(req.query);
        }
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const delRole = async (req, res, next) => {
    try {

        const result = await roleServices.del(req.params.id);

        res.status(200).json({
            data: result,
            message: "delete success"
        });
    } catch (e) {
        next(e);
    }
}