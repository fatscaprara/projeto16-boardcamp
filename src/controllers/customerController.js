import connection from "../database/database.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    const query = cpf
      ? "SELECT * FROM customers WHERE cpf LIKE $1"
      : "SELECT * FROM customers;";

    const optionalValue = cpf ? [`${cpf}%`] : null;

    const { rows } = await connection.query(query, optionalValue);

    const result = rows.length > 1 ? rows : rows[0];
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomersById(req, res) {
  const { user } = req;

  try {
    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.user;

  try {
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function putCustomersById(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.user;

  try {
    await connection.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;",
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
