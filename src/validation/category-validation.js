import joi from 'joi'

export const saveCategoryValidation = joi.object({
    id: joi.string(),
    name: joi.string().required()
})

