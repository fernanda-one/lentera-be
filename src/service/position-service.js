import {validate} from "../validation/validation.js";
import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/response-error.js";
import * as uuid from "uuid";
import {savePositionValidation} from "../validation/position-validation.js";

export const savePosition = async (req) => {
    const position = validate(savePositionValidation, req)

    const isNameExist = await prismaClient.positions.findFirst({
        where: {
            name: req.name,
            deleted: false
        }
    });

    if (!position.id) {
        position.id = uuid.v4();
    } else {
        await getDetail(req.id)
    }

    if (isNameExist && !position.id) {
        throw new ResponseError(400, `Position with name ${req.name} already exists`);
    }

    return prismaClient.positions.upsert({
        where: {
            id: position.id
        },
        create: position,
        update: position,
        select: {
            id: true
        }
    })
}

export const getAll = async (req) => {
    return prismaClient.positions.findMany({
        where: {
            name: {contains: req.search},
            deleted: false
        }
    })
}
export const getDetail = async (id) => {
    const isExist = await prismaClient.positions.findFirst({
        where: {
            id,
            deleted: false
        }
    });

    if (!isExist) {
        throw new ResponseError(400, `Position with ID ${id} does not exist`);
    }

    return prismaClient.positions.findMany({
        where: {
            id
        }
    })
}

export const del = async (id) => {
    await getDetail(id)

    return prismaClient.positions.update({
        where: {
            id
        },
        data: {
            deleted: true
        }
    })
}
