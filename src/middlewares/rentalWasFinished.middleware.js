import db from "../config/database.js";

export async function rentalWasFinished(req, res, next) {
  try {
    const { id } = req.params;
    const checkRentalFinished = await db.query(
      `
      SELECT
        *
      FROM
        rentals
      WHERE
        id = $1
      AND
        "returnDate" IS NOT NULL
      ;
    `,
      [id]
    );

    if (checkRentalFinished.rowCount) return res.sendStatus(400);

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
