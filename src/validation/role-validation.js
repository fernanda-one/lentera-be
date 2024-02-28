import joi from 'joi'

export const saveRoleValidation = joi.object({
    id: joi.string(),
    name: joi.string().required()
})
