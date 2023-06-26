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
export default { create, get };
