import contactService from "../services/contactService.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
 
    const result = await contactService.create(req.user, request);
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await contactService.get(req.user, req.params.contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;
    const result = await contactService.update(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req.user, req.params.contactId);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await contactService.search(req.user, req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default { create, get, update, remove, search };
