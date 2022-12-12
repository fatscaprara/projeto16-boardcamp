import connection from "../database/database.js";

export async function gameValidate(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  if (stockTotal <= 0 || pricePerDay <= 0) {
    return res.sendStatus(400);
  }

  try {
    const categoryIdExist = await connection.query(
      "SELECT * FROM categories WHERE id = $1",
      [categoryId]
    );

    if (!categoryIdExist.rows[0]) {
      return res.sendStatus(400);
    }

    const nameGameExist = await connection.query(
      "SELECT * FROM games WHERE name = $1",
      [name]
    );

    if (nameGameExist.rows[0]) {
      return res.sendStatus(409);
    }

    req.game = req.body;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
