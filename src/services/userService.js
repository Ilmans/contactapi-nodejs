import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import { ResponseError } from "../errors/responError.js";
import { registerUserValidation } from "../validations/userValidation.js";
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
   throw new ResponseError(400,"Username already exists!")
  }
  return await prismaClient.user.create({
    data: { ...user, password: bcrypt.hashSync(user.password, 10) },
    select: {
      username: true,
      name: true,
    },
  });
 
};

export default {
  register
}
