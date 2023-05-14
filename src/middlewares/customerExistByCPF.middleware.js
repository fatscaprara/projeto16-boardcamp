import db from "../config/database.js";

export async function customerExistByCPF(req, res, next) {
  try {
    const { customer } = req;
    const findCustomer = await db.query(
      `
      SELECT
        *
      FROM
        customers
      WHERE
        cpf = $1
      ;
    `,
      [customer.cpf]
    );

    if (findCustomer.rowCount) return res.sendStatus(409);

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
