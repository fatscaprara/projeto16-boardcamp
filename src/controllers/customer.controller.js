import dayjs from "dayjs";
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

    const newCustomers = customers.rows.map((customer) => {
      const dateFormated = dayjs(customer.birthday).format("YYYY-MM-DD");
      return { ...customer, birthday: dateFormated };
    });

    res.send(newCustomers);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  try {
    const customer = req.customer.rows[0];

    const dateFormated = dayjs(customer.birthday).format("YYYY-MM-DD");
    res.send({ ...customer, birthday: dateFormated });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function postCustomers(req, res) {
  try {
    const { name, cpf, phone, birthday } = req.customer;

    await db.query(
      `
      INSERT INTO
        customers (name, cpf, phone, birthday)
      VALUES
        ($1, $2, $3, $4)
    `,
      [name, cpf, phone, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function putCustomer(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, birthday } = req.body;

    await db.query(
      `
      UPDATE
        customers
      SET
        name = $1,
        phone = $2,
        birthday = DATE $3
      WHERE
        id = $4
      ;
    `,
      [name, phone, birthday, id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
