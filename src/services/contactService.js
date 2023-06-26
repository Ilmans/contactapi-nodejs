
import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
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

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);
  const totalContact = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if (totalContact < 1) throw new ResponseError(404, "Contact doesn't found");
  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const query = { where: { id: contactId, username: user.username } };
  const totalContact = await prismaClient.contact.count(query);

  if (totalContact < 1) throw new ResponseError(404, "Contact doesn't found");
  delete query.where.username;

  return prismaClient.contact.delete(query);
};

export default { create, get, update, remove };
