import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/responError.js";
import { validate } from "../validations/validation.js";
import { getContactValidation } from "../validations/contactValidation.js";
import { createAddressValidation } from "../validations/addressValidation.js";

async function checkContact(id, username) {
  const count = await prismaClient.contact.count({
    where: { id, username },
  });
  if (count < 1) throw new ResponseError(404, "Contact doesn't found");
}

const create = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);
  await checkContact(contactId, user.username);
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

export default {
  create,
};
