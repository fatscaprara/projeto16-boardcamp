import customerSchema from "../schemas/customer.schema.js";

export function customerIsValid(req, res, next) {
  const customer = req.body;
  const { error } = customerSchema.validate(customer);

  if (error) return res.sendStatus(400);

  req.customer = customer;
  next();
}
