import joi from 'joi'

export const saveSubCategoryValidation = joi.object({
    id: joi.string(),
    name: joi.string().required()
})

