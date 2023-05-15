import db from "../config/database.js";

export async function customerAuthByCPF(req, res, next) {
  try {
    const { id } = req.params;
    const customer = req.body;

    const findCustomerByCPF = await db.query(
      `
      SELECT
        *
      FROM
        customers
      WHERE
        cpf = $1
      AND
        id <> $2
      ;
    `,
      [customer.cpf, id]
    );

    if (findCustomerByCPF.rowCount) return res.sendStatus(409);

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
