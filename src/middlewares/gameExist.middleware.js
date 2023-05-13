import db from "../config/database.js";

export async function gameExist(req, res, next) {
  try {
    const { game } = req;

    const findGame = await db.query(
      `
      SELECT
        *
      FROM
        games
      WHERE
        name = $1
      ;
    `,
      [game.name]
    );

    if (findGame.rowCount) return res.sendStatus(409);

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
