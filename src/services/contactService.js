
import {
  createContactValidation,
  getContactValidation,
} from "../validations/contactValidation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validations/validation.js";
import { ResponseError } from "../errors/responError.js";

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

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
  
  if (!contact) throw new ResponseError(404, "Contact doesn't found");
  return contact;
};

export default { create, get };
