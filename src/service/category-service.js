import {validate} from "../validation/validation.js";
import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/response-error.js";
import * as uuid from "uuid";
import {saveCategoryValidation} from "../validation/category-validation.js";

export const saveCategory = async (req) => {
    const category = validate(saveCategoryValidation, req)

    const isNameExist = await prismaClient.contentCategory.findFirst({
        where: {
            name: req.name
        }
    });

    if (!category.id) {
        category.id = uuid.v4();
    } else {
        await getDetail(req.id)
    }
    console.log(isNameExist)

    if(isNameExist && !req.id && isNameExist.deleted){
        return prismaClient.contentCategory.update({
            where: {
                id: isNameExist.id
            },
            data:{
                deleted:false
            }
        })
    } else if (isNameExist && !req.id && !isNameExist.deleted) {
            throw new ResponseError(400, `Category with name ${req.name} already exists`);
    } else {
        return prismaClient.contentCategory.upsert({
            where: {
                id: category.id
            },
            create: category,
            update: category,
            select: {
                id: true
            }
        })

    }

}

export const getAll = async (req) => {
    return prismaClient.contentCategory.findMany({
        where: {
            name: {contains: req.search},
            deleted: false
        }
    })
}
export const getDetail = async (id) => {
    const isExist = await prismaClient.contentCategory.findFirst({
        where: {
            id,
            deleted: false
        }
    });

    if (!isExist) {
        throw new ResponseError(400, `Sub Category with ID ${id} does not exist`);
    }

    return prismaClient.contentCategory.findMany({
        where: {
            id
        }
    })
}

export const del = async (id) => {
    await getDetail(id)

    return prismaClient.contentCategory.update({
        where: {
            id
        },
        data: {
            deleted: true
        }
    })
}
