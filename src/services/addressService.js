import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/responError.js";
import { validate } from "../validations/validation.js";
import { getContactValidation } from "../validations/contactValidation.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validations/addressValidation.js";

async function checkContact(id, username) {
  id = validate(getContactValidation, id);
  const count = await prismaClient.contact.count({
    where: { id, username },
  });
  if (count < 1) throw new ResponseError(404, "Contact doesn't found");
  return id;
}

const create = async (user, contactId, request) => {
  contactId = await checkContact(contactId, user.username);
  const address = validate(createAddressValidation, request);
  address.contact_id = contactId;
  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (user, contactId, adressId) => {
  contactId = await checkContact(contactId, user.username);
  adressId = validate(getAddressValidation, adressId);
  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: adressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) throw new ResponseError(404, "Adress doesn't found");
  return address;
};

const update = async (user, contactId, request) => {
  contactId = await checkContact(contactId, user.username);
  const address = validate(updateAddressValidation, request);

  const check = await prismaClient.address.count({
    where: {
      id: request.id,
      contact_id: contactId,
    },
  });

  if (check < 1) throw new ResponseError(404, "address doesn't found");
  return await prismaClient.address.update({
    where: { id: request.id },
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = await checkContact(contactId, user.username);

  addressId = validate(getAddressValidation, addressId);

  const query = { where: { id: addressId, contact_id: contactId } };
  const check = await prismaClient.address.count(query);
  if (check < 1) throw new ResponseError(404, "address doesn't found");
  delete query.where.contact_id;
  return prismaClient.address.delete(query);
};

export default {
  create,
  get,
  update,
  remove,
};
