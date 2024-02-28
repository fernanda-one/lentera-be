import * as positionServices from "../service/position-service.js";

export const createPosition = async (req, res, next) => {
    try {
        const result = await positionServices.savePosition(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const updatePosition = async (req, res, next) => {
    try {
        req.body.id = req.params.id
        const result = await positionServices.savePosition(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const getAllPositions = async (req, res, next) => {
    try {
        let result
        if (req.params.id) {
            result = await positionServices.getDetail(req.params.id);
        } else {
            result = await positionServices.getAll(req.query);
        }
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export const delPosition = async (req, res, next) => {
    try {

        const result = await positionServices.del(req.params.id);

        res.status(200).json({
            data: result,
            message: "delete success"
        });
    } catch (e) {
        next(e);
    }
}