
import { createContactValidation } from "../validations/contactValidation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validations/validation.js";

const create = async (user, request) => {

  let contact = validate(createContactValidation, request);
 

  contact.username = user.username;
  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

export default { create };
