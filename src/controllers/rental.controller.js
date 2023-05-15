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

export async function getRentals(req, res) {
  try {
    const rentals = await db.query(`
      SELECT
        r.id,
        r."customerId",
        r."gameId",
        r."rentDate",
        r."daysRented",
        r."returnDate",
        r."originalPrice",
        r."delayFee",
        c.name AS "customerName",
        g.name AS "gameName"
      FROM
        customers c
      JOIN
        rentals r
      ON
        c.id = r."customerId"
      JOIN
        games g
      ON
        g.id = r."gameId"
      ;
    `);

    const {
      id,
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
      customerName,
      gameName,
    } = rentals.rows;

    const rentalsFormatted = rentals.rows.map(
      ({
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customerName,
        gameName,
      }) => {
        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: customerId,
            name: customerName,
          },
          game: {
            id: gameId,
            name: gameName,
          },
        };
      }
    );

    res.send(rentalsFormatted);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
