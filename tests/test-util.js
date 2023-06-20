import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"
const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "menzcreate",
    },
  });
};

const createUserTest = async () => {
  await prismaClient.user.create({
    data: {
      username: "menzcreate",
      password: bcrypt.hashSync("rahasia",10),
      name: "Ilman S",
      token: "test",
    },
  });
};

export default {
  removeTestUser,
  createUserTest
};
