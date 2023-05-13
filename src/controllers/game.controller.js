import db from "../config/database.js";

export async function getAllGames(req, res) {
  try {
    const games = await db.query(`
      SELECT
        *
      FROM
        games
      ;
    `);

    res.send(games.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function postGames(req, res) {
  try {
    const { name, image, stockTotal, pricePerDay } = req.game;

    await db.query(
      `
      INSERT INTO
        games (name, image, "stockTotal", "pricePerDay")
      VALUES
        ($1, $2, $3, $4)
      ;
    `,
      [name, image, stockTotal, pricePerDay]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
