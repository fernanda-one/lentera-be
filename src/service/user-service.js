import { prismaClient } from "../config/database.js";
import { hash } from "../helper/bcyrpt.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import * as uuid from "uuid";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ResponseError } from "../error/response-error.js";

import { omit } from "../helper/omit.js";
import {updateStatusUserValidation} from "../validation/update-status-user-validation.js";

const register = async (request) => {
  const user = validate(registerUserValidation, request);
  console.log(user)
  const countUser = await prismaClient.users.findFirst({
    where: {
      email: request.email,
      deleted: false,
    },
  });
  const role = await prismaClient.roles.findFirst({
    where: {
      id: request.role_id,
      deleted: false,
    },
  });
  if (request.position_id) {
    const position = await prismaClient.positions.findFirst({
      where: {
        id: request.position_id,
        deleted: false,
      },
    });
    user.position = { connect: { id: position.id } };
  }
  if (countUser) {
    throw new ResponseError(400, "Email already exists");
  }
  const salt = uuid.v4();
  user.password = await hash(request.password, salt);
  user.salt = salt;
  user.role = { connect: { id: role.id } };

  console.log(user);

  return prismaClient.users.create({
    data: omit(user, ["role_id", "position_id"]),
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
const update = async (request, id) => {
  const user = validate(updateUserValidation, request);
  const countUser = await prismaClient.users.findFirst({
    where: {
      email: request.email,
    },
  });
  const role = await prismaClient.roles.findFirst({
    where: {
      id: request.role_id,
    },
  });
  if (request.position_id) {
    const position = await prismaClient.positions.findFirst({
      where: {
        id: request.position_id,
      },
    });
    user.position = { connect: { id: position.id } };
  }
  if (countUser && countUser.email !== request.email) {
    throw new ResponseError(400, "Email already exists");
  }
  user.role = { connect: { id: role.id } };

  console.log(user);

  return prismaClient.users.update({
    where: {
      id,
    },
    data: omit(user, ["role_id", "position_id"]),
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
const updateStatus = async (id,role_id) => {
  const countUser = await prismaClient.users.findFirst({
    where: {
      id
    },
  });

  if (!countUser) {
    throw new ResponseError(400, "User Not Found");
  }
  const role = await prismaClient.roles.findFirst({
    where: {
      id: role_id
    },
  });

  if (role.name !== 'admin') {
    throw new ResponseError(400, "only admin can update this action");
  }
  countUser.is_active = true;

  return prismaClient.users.update({
    where: {
      id,
    },
    data: omit(countUser, ["role_id", "position_id"]),
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.users.findFirst({
    where: {
      email: loginRequest.email,
    },
  });
  if (!user) {
    throw new ResponseError(401, "Email or password wrong");
  }
  if (!user.is_active) {
    throw new ResponseError(401, "User inactive");
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
    role: user?.role_id,
    session_id: session.id,
    name: user?.name,
    email: user?.email,
    refresh_token: session.refresh_token,
  };
  const secret_key = process.env.SECRET_JWT;
  const accessToken = jwt.sign(payload, secret_key, {
    expiresIn: "1d",
  });
  const refreshToken = session.refresh_token;
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};
const logout = async (request) => {
  console.log("🚀 ~ logout ~ request:", request.user);
  const session_id = request.user.session_id;
  const session = await prismaClient.sessions.findFirst({
    where: {
      id: session_id,
    },
  });
  if (!session) {
    throw new ResponseError(401, "session not found!");
  }
  await prismaClient.sessions.updateMany({
    where: {
      id: session_id,
    },
    data: {
      status: false,
    },
  });
};

const refreshToken = async (request) => {
  const refresh_token = request.user.refresh_token;
  if (!refresh_token) throw new ResponseError(401, "token not found");
  const session = await prismaClient.sessions.findFirst({
    where: {
      refresh_token: refresh_token,
      status: true,
    },
    include: {
      users: {
        include: {
          roles: true,
        },
      },
    },
  });
  if (!session) {
    throw new ResponseError(401, "session not found!");
  }

  const user = session?.users;
  console.log(user)
  const payload = {
    sub: user?.id,
    role: user?.role?.name,
    session_id: session.id,
    name: user?.name,
    email: user?.email,
  };
  const secret_key = process.env.SECRET_JWT;
  const accessToken = jwt.sign(payload, secret_key, {
    expiresIn: "1d",
  });
  return { access_token: accessToken };
};

const getAll = async (req) => {
  return prismaClient.users.findMany({
    where: {
      OR: [
        {
          name: { contains: req.search },
        },
        { email: { contains: req.search } },
      ],
      deleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      position_id: true,
      role_id: true,
    },
  });
};
const detail = async (id) => {
  return prismaClient.users.findFirst({
    where: {
      id,
      deleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      position_id: true,
      role_id: true,
    },
  });
};

const del = async (id) => {
  return prismaClient.users.update({
    where: {
      id,
    },
    select: {
      deleted: true,
      is_active: false,
    },
  });
};

export default {
  register,
  login,
  refreshToken,
  logout,
  getAll,
  detail,
  del,
  update,
  updateStatus
};
