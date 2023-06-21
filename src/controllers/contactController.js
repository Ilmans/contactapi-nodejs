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

export default { create };
