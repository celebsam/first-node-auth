const Joi = require("joi");
const { schema } = require("../models/user");

const registerValidation = (data) => {
   const schema = Joi.object({
      name: Joi.string().required().min(3),
      email: Joi.string().required().min(7).email(),
      password: Joi.string().required().min(5),
   });
   return schema.validate(data);
};

const loginValidation = (data) => {
   const schema = Joi.object({
      email: Joi.string().required().min(7).email(),
      password: Joi.string().required().min(5),
   });
   return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
