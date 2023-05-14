import Joi from "joi";

const customerSchema = Joi.object({
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\d{10,11}$/)
    .required(),
  name: Joi.string().required().min(1),
  birthday: Joi.date().required(),
});

export default customerSchema;
