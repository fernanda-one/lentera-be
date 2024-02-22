import { prismaClient } from "../config/database.js";
import { hash } from "../helper/bcyrpt.js";
import { loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import * as uuid from "uuid"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { ResponseError } from "../error/response-error.js";

import {omit} from "../helper/omit.js";


const register = async (request) => {
    const user = validate(registerUserValidation, request);
    const countUser = await prismaClient.users.findFirst({
        where:{
            email:request.email
        }
    })
    const role = await prismaClient.roles.findFirst({
        where:{
            id:request.role_id
        }
    })
    if (request.position_id) {
        const position = await prismaClient.positions.findFirst({
            where:{
                id:request.position_id
            }
        })
        user.position = { connect: { id: position.id } }
    }
    if (countUser) {
        throw new ResponseError(400, "Email already exists");
    }
    const salt = uuid.v4();
    user.password = await hash(request.password, salt)
    user.salt = salt
    user.role = { connect: { id: role.id } }

    console.log(user)

    return prismaClient.users.create({
        data: omit(user,["role_id","position_id"]),
        select: {
            name: true,
            email: true
        }
    });
}
const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.users.findFirst({
        where: {
            email: loginRequest.email
        }
    });
    if (!user) {
        throw new ResponseError(401, "Email or password wrong");
    }
    const hashedPassword = await hash(loginRequest.password, user.salt);
    if (hashedPassword !== user.password) {
        throw new ResponseError(401, "Email or password wrong");
    }
    const session = await prismaClient.sessions.create({
        data: {
          users_id: user.id,
          refresh_token: uuid.v4(),
          status: true,
        },
      });
      const payload = {
        sub: user?.id,
        role: user?.role?.name,
        session_id: session.id,
        name: user?.name,
        email:user?.email,
        refresh_token:session.refresh_token
      };
      const secret_key = process.env.SECRET_JWT
      const accessToken = jwt.sign(payload,secret_key, {
        expiresIn: '1d',
      });
      const refreshToken = session.refresh_token;
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
}
const logout = async (request) => {
    console.log("🚀 ~ logout ~ request:", request.user)
    const session_id =  request.user.session_id
    const session = await prismaClient.sessions.findFirst({
        where:{
            id: session_id
        }
    })
    if (!session) {
        throw new ResponseError(401, "session not found!")
    }
    await prismaClient.sessions.updateMany({
        where:{
            id: session_id
        },
        data:{
            status:false
        }
    })
}

const refreshToken = async (request) => {
    const refresh_token = request.user.refresh_token
    if(!refresh_token) throw new ResponseError(401, "token not found")
    const session = await prismaClient.sessions.findFirst({
        where:{
            refresh_token: refresh_token,
            status: true
        }, 
        include:{
            users:{
                include:{
                    role:true
                }
            }
        }
    })
    if (!session) {
        throw new ResponseError(401, "session not found!")
    }
    const user = session?.users
    const payload = {
        sub: user?.id,
        role: user?.role?.name,
        session_id: session.id,
        name: user?.name,
        email:user?.email
      };
      const secret_key = process.env.SECRET_JWT
      const accessToken = jwt.sign(payload,secret_key, {
        expiresIn: '1d',
      });
      return {access_token :accessToken}
}

const getAll = async(req) => {
    return prismaClient.users.findMany({
        select: {
            id:true,
            name:true,
            email:true,
            position_id:true,
            role_id:true
        }
    })
}

export default {
    register,
    login,
    refreshToken,
    logout,
    getAll
}