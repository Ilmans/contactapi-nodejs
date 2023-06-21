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

const getUserTest = async () => {
  return await prismaClient.user.findUnique({
    where: {
      username: "menzcreate",
    },
  });
};


const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "menzcreate",
    },
  });
};

export default {
  removeTestUser,
  createUserTest,
  getUserTest,
  removeAllTestContacts,
};
