import connection from "../database/database.js";

export async function customerExistValidate(req, res, next) {
  const { id } = req.params;

  try {
    const { rows } = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );

    if (!rows.length) {
      return res.sendStatus(404);
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
