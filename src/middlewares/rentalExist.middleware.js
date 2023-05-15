import db from "../config/database.js";

export async function rentalExist(req, res, next) {
  try {
    const { id } = req.params;

    const findRentalById = await db.query(
      `
      SELECT
        *
      FROM
        rentals
      WHERE
        id = $1
      ;
    `,
      [id]
    );

    if (!findRentalById.rowCount) return res.sendStatus(404);

    req.rental = findRentalById.rows[0];
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
