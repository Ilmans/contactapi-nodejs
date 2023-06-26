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

const createTestContact = async () => {
  await prismaClient.contact.create({
    data : {
      username: "menzcreate",
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      phone: "23234323423",
    },
  });
};

const getTestContact = async () => {
  return await prismaClient.contact.findFirst({
    where: {
      username: "menzcreate",
    },
  });
};

const createManyTestContacts = async () => {
  for (let i = 1; i <= 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: `menzcreate`,
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `23234323423${i}`,
      },
    });
  }
};

const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "menzcreate",
      },
    },
  });
};
export default {
  removeTestUser,
  createUserTest,
  getUserTest,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContacts,
  removeAllTestAddresses,
};
