import joi from 'joi'

export const updateStatusUserValidation = joi.object({
    id: joi.string()
})