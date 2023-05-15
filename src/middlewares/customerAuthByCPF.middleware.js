import db from "../config/database.js";

export async function customerAuthByCPF(req, res, next) {
  try {
    const { id } = req.params;
    const customer = req.body;
    const findCustomerById = await db.query(
      `
      SELECT
        *
      FROM
        customers
      WHERE
        id = $1
      ;
    `,
      [id]
    );

    const findCustomerByCPF = await db.query(
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

    if (findCustomerByCPF.rows[0].id !== id) return res.sendStatus(409);

    // if (findCustomerById.rows[0].cpf !== customer.cpf) {
    //   return res.sendStatus(409);
    // }

    // if (!findCustomerById.rowCount) return res.sendStatus(404);

    // if (findCustomerById.rows[0].cpf !== customer.cpf)
    //   return res.sendStatus(409);

    // if (!findCustomerByCPF.rowCount) return res.sendStatus(409);

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
