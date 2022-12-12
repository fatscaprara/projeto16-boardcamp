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
