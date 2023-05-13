import db from "../config/database.js";

export async function getAllCustomers(req, res) {
  try {
    const customers = await db.query(`
      SELECT
        *
      FROM
        customers
      ;
    `);

    res.send(customers.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  try {
    const customer = req.customer.rows[0];

    res.send(customer);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
