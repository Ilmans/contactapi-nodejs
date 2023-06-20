import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../errors/responError.js";
import {v4 as uuid} from "uuid"
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validations/userValidation.js";
import { validate } from "../validations/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);
  const foundUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (foundUser > 0) {
    throw new ResponseError(400, "Username already exists!");
  }
  return await prismaClient.user.create({
    data: { ...user, password: bcrypt.hashSync(user.password, 10) },
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  

  if (!user || !bcrypt.compareSync(loginRequest.password, user.password)) {
    throw new ResponseError(401, "Invalid credentials!");
  }
  const token = uuid().toString();
  return await prismaClient.user.update({
    data : {
      token : token
    },
    where : {
      username : user.username
    },
    select : {
      token : true
    }
  })
};

const getUser = async (username) => {
  username = validate(getUserValidation, username);
  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select : {
      username : true,
      name : true
    }
  });

  if(!user) {
    throw new ResponseError(404,"User not found");

  }
  return user;
};

export default {
  register,
  login,
  getUser,
};
