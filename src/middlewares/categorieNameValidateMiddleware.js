import connection from "../database/database.js";

export async function categorieNameValidate(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const nameExist = await connection.query(
      "SELECT * FROM categories WHERE name = $1",
      [name]
    );
    if (nameExist.rows[0]) {
      return res.sendStatus(409);
    }

    req.name = name;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
