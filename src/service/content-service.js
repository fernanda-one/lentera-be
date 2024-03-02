import {validate} from "../validation/validation.js";
import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/response-error.js";
import * as uuid from "uuid";
import {saveValidationContent} from "../validation/content-validation.js";
import * as categoryService from "./category-service.js"
import * as subCategoryService from "./sub-category-service.js"
import {omit} from "../helper/omit.js";

export const saveContent = async (req,user) => {
    const content = validate(saveValidationContent, req)

    if (!content.id) {
        content.id = uuid.v4();
        content.created_bys = {connect: {id: user}}
    } else {
        const contentDetail = await getDetail(req.id)
        content.created_bys = {connect: {id: contentDetail.created_by}}
    }

    const category = await categoryService.getDetail(content.category_id)
    const subCategory = await subCategoryService.getDetail(content.sub_category_id)
    content.categories = {connect: {id: category.id}}
    content.SubContentCategory = {connect: {id: subCategory.id}}

    return prismaClient.content.upsert({
        where: {
            id: content.id
        },
        create: omit(content,['category_id','sub_category_id','created_by']),
        update: omit(content,['category_id','sub_category_id','created_by']),
        select: {
            id: true
        }
    })


}

export const getAll = async (req) => {
    return prismaClient.Content.findMany({
        where: {
            tittle: {contains: req.search},
            deleted: false
        }
    })
}
export const getDetail = async (id) => {
    const isExist = await prismaClient.content.findFirst({
        where: {
            id,
            deleted: false
        }
    });

    if (!isExist) {
        throw new ResponseError(400, `Content with ID ${id} does not exist`);
    }

    return prismaClient.content.findFirst({
        where: {
            id
        }
    })
}

export const del = async (id) => {
    await getDetail(id)

    return prismaClient.Content.update({
        where: {
            id
        },
        data: {
            deleted: true
        }
    })
}
