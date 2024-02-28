import {validate} from "../validation/validation.js";
import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/response-error.js";
import * as uuid from "uuid";
import {saveSubCategoryValidation} from "../validation/sub-category-validation.js";

export const saveSubCategory = async (req) => {
    const subCategory = validate(saveSubCategoryValidation, req)

    const isNameExist = await prismaClient.SubContentCategory.findFirst({
        where: {
            name: req.name
        }
    });

    if (!subCategory.id) {
        subCategory.id = uuid.v4();
    } else {
        await getDetail(req.id)
    }
    console.log(isNameExist)

    if(isNameExist && !req.id && isNameExist.deleted){
        return prismaClient.SubContentCategory.update({
            where: {
                id: isNameExist.id
            },
            data:{
                deleted:false
            }
        })
    } else if (isNameExist && !req.id && !isNameExist.deleted) {
        throw new ResponseError(400, `Sub category with name ${req.name} already exists`);
    } else {
        return prismaClient.SubContentCategory.upsert({
            where: {
                id: subCategory.id
            },
            create: subCategory,
            update: subCategory,
            select: {
                id: true
            }
        })

    }

}

export const getAll = async (req) => {
    return prismaClient.SubContentCategory.findMany({
        where: {
            name: {contains: req.search},
            deleted: false
        }
    })
}
export const getDetail = async (id) => {
    const isExist = await prismaClient.SubContentCategory.findFirst({
        where: {
            id,
            deleted: false
        }
    });

    if (!isExist) {
        throw new ResponseError(400, `Sub Category with ID ${id} does not exist`);
    }

    return prismaClient.SubContentCategory.findMany({
        where: {
            id
        }
    })
}

export const del = async (id) => {
    await getDetail(id)

    return prismaClient.SubContentCategory.update({
        where: {
            id
        },
        data: {
            deleted: true
        }
    })
}
