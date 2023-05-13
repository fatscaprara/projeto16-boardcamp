import db from "../config/database.js";

export async function customerExistById(req, res, next) {
  try {
    const { id } = req.params;
    const findCustomer = await db.query(
      `
      SELECT
        *
      FROM
        customers
      WHERE
        id = $1
    `,
      [id]
    );

    if (!findCustomer.rowCount) return res.sendStatus(404);

    req.customer = findCustomer;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
