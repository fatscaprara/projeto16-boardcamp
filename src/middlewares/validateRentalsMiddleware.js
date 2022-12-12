import dayjs from "dayjs";
import connection from "../database/database.js";

export async function validateRentals(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  if (daysRented <= 0) {
    return res.sendStatus(400);
  }
  try {
    const findGameById = await connection.query(
      "SELECT * FROM games WHERE id = $1;",
      [gameId]
    );

    if (!findGameById.rows.length) {
      return res.sendStatus(400);
    }

    const findCustomerById = await connection.query(
      "SELECT * FROM customers WHERE id = $1;",
      [customerId]
    );

    if (!findCustomerById.rows.length) {
      return res.sendStatus(400);
    }

    const findRentalsByGameId = await connection.query(
      'SELECT * FROM rentals WHERE "gameId" = $1 AND "daysRented" > 0;',
      [gameId]
    );

    if (findRentalsByGameId.rows.length > findGameById.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = daysRented * findGameById.rows[0].pricePerDay;
    req.rentals = {
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate: null,
      originalPrice,
      delayFee: null,
    };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
