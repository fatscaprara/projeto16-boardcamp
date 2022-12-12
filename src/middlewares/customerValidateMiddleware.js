import connection from "../database/database.js";
import customerSchema from "../schemas/customerSchema.js";

export async function customerValidate(req, res, next) {
  const customer = req.body;
  const { error } = customerSchema.validate(customer, { abortEarly: false });

  if (error?.details) {
    console.log(error.details);
    return res.sendStatus(400);
  }

  try {
    const { rows } = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [customer.cpf]
    );

    if (rows?.length) {
      return res.sendStatus(409);
    }

    req.user = customer;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
