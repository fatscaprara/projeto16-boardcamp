import db from "../config/database.js";

export async function rentalIsValid(req, res, next) {
  try {
    const rental = req.body;

    if (rental.daysRented <= 0) return res.sendStatus(400);

    const findCustomerById = await db.query(
      `
      SELECT
        *
      FROM
        customers
      WHERE
        id = $1
      ;
    `,
      [rental.customerId]
    );

    if (!findCustomerById.rowCount) return res.sendStatus(400);

    const findGameById = await db.query(
      `
      SELECT
        *
      FROM
        games
      WHERE
        id = $1
      ;
    `,
      [rental.gameId]
    );

    if (!findGameById.rowCount) return res.sendStatus(400);

    const findOpenRentalsByGameId = await db.query(
      `
      SELECT
        *
      FROM
        rentals
      WHERE
        "gameId" = $1 AND "returnDate" IS NULL
      ;
    `,
      [rental.gameId]
    );

    if (findOpenRentalsByGameId.rowCount >= findGameById.rows[0].stockTotal)
      return res.sendStatus(400);

    //validações feitas

    req.game = findGameById.rows[0];
    req.customer = findCustomerById.rows[0];
    req.rental = rental;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
