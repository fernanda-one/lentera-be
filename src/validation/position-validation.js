import joi from 'joi'

export const savePositionValidation = joi.object({
    id: joi.string(),
    name: joi.string().required()
})
