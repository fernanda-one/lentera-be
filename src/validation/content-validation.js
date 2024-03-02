import joi from "joi";

export const saveValidationContent = joi.object({
    id: joi.string().optional(),
    tittle: joi.string().required(),
    category_id: joi.string().required(),
    sub_category_id: joi.string().required(),
    desc: joi.string().required(),
    main_content: joi.string().required(),
    status: joi.string().optional(),
    created_by: joi.string().optional(),
    approved_by: joi.string().optional(),
    img_url: joi.string().optional(),
})