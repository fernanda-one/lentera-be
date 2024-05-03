import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        req.body.is_active = false;
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}
const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.body,req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const result = await userService.updateStatus(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const result = await userService.logout(req);
        res.status(200).json({
            message: "success"
        })
    } catch (e) {
        next(e);
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const result = await userService.refreshToken(req)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const getList = async (req, res, next) => {
    try {
        const result = await userService.getAll(req.query)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const detail = async (req, res, next) => {
    try {
        const result = await userService.detail(req.params.id)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}
const del = async (req, res, next) => {
    try {
        const result = await userService.del(req.params.id)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    refreshToken,
    logout,
    getList,
    detail, del, update,updateStatus
}