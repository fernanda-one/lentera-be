import {validate} from "../validation/validation.js";
import {saveRoleValidation} from "../validation/role-validation.js";
import {prismaClient} from "../config/database.js";
import {ResponseError} from "../error/response-error.js";
import * as uuid from "uuid";

export const saveRole = async (req) => {
    const role = validate(saveRoleValidation, req)

    const isNameExist = await prismaClient.roles.findFirst({
        where: {
            name: req.name,
            deleted: false
        }
    });

    if (!role.id) {
        role.id = uuid.v4();
    } else {
        const isExist = await prismaClient.roles.findFirst({
            where: {
                id: req.id,
                deleted: false
            }
        });

        if (!isExist) {
            throw new ResponseError(400, `Role with ID ${req.id} does not exist`);
        }
    }

    if (isNameExist && !role.id) {
        throw new ResponseError(400, `Role with name ${req.name} already exists`);
    }

    return prismaClient.roles.upsert({
        where: {
            id: role.id
        },
        create: role,
        update: role,
        select: {
            id: true
        }
    })
}

export const getAll = async (req) => {
    return prismaClient.roles.findMany({
        where: {
            name: {contains: req.search},
            deleted: false
        }
    })
}
export const getDetail = async (id) => {
    const isExist = await prismaClient.roles.findFirst({
        where: {
            id,
            deleted: false
        }
    });

    if (!isExist) {
        throw new ResponseError(400, `Role with ID ${id} does not exist`);
    }

    return prismaClient.roles.findFirst({
        where: {
            id
        }
    })
}

export const del = async (id) => {
    const isExist = await prismaClient.roles.findFirst({
        where: {
            id,
            deleted: false
        }
    });

    if (!isExist) {
        throw new ResponseError(400, `Role with ID ${req.id} does not exist`);
    }

    return prismaClient.roles.update({
        where: {
            id
        },
        data: {
            deleted: true
        }
    })
}
