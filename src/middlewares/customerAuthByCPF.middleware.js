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
      AND
        id <> $2
      ;
    `,
      [customer.cpf, id]
    );

    if (findCustomerByCPF.rowCount) return res.sendStatus(409);

    // console.log(findCustomerByCPF.rows[0]);

    // console.log(findCustomerByCPF.rows[0].id, typeof id);

    // if (findCustomerByCPF.rows[0].id !== Number(id)) return res.sendStatus(409);

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
