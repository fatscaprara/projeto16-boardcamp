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
