import contactService from "../services/contactService";

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

export default { create, get };
