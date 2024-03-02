import * as contentServices from '../service/content-service.js';

export const createContent = async (req, res, next) => {
    try {
        // console.log(req.user)
        const user = req.user.sub
        const result = await contentServices.saveContent(req.body,user);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const updateContent = async (req, res, next) => {
    try {
        req.body.id = req.params.id
        const result = await contentServices.saveContent(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const getAllContents = async (req, res, next) => {
    try {
        let result
        if (req.params.id) {
            result = await contentServices.getDetail(req.params.id);
        } else {
            result = await contentServices.getAll(req.query);
        }
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const delContent = async (req, res, next) => {
    try {

        const result = await contentServices.del(req.params.id);

        res.status(200).json({
            data: result,
            message: "delete success"
        });
    } catch (e) {
        next(e);
    }
}