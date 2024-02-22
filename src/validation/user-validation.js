import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    role_id: Joi.string().required(),
    position_id: Joi.string()
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    name: Joi.string().max(100).required(),
    role_id: Joi.string().required(),
    position_id: Joi.string()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
