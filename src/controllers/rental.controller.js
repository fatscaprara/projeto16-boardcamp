import dayjs from "dayjs";
import db from "../config/database.js";

export async function postRentals(req, res) {
  try {
    const { pricePerDay } = req.game;
    const { customerId, gameId, daysRented } = req.rental;

    const rentDate = dayjs().format("YYYY-MM-DD");

    const originalPrice = daysRented * pricePerDay;

    const returnDate = null;

    const delayFee = null;

    await db.query(
      `
      INSERT INTO
        rentals ("customerId", 
                 "gameId",
                 "rentDate",
                 "daysRented",
                 "returnDate",
                 "originalPrice",
                 "delayFee")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      ;
    `,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
