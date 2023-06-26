import addressService from "../services/addressService.js";

const create = async (req, res, next) => {
  try {
    const result = await addressService.create(
      req.user,
      req.params.contactId,
      req.body
    );

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await addressService.get(
      req.user,
      req.params.contactId,
      req.params.adressId
    );
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    let data = req.body;
    data.id = parseInt(req.params.addressId);
    const result = await addressService.update(
      req.user,
      req.params.contactId,
      data
    );
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const result = await addressService.remove(
      req.user,
      req.params.contactId,
      req.params.addressId
    );
    res.status(200).json({ data: "OK" });
  } catch (error) {
    next(error);
  }
};

export default { create, get, update, remove };
