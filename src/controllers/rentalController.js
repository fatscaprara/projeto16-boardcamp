import connection from "../database/database.js";

export async function postRentals(req, res) {
  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
  } = req.rentals;

  try {
    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
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
    res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    const query = `SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId",categories.name AS "categoryName" 
      FROM rentals 
      JOIN customers ON rentals."customerId" = customers.id 
      JOIN games ON rentals."gameId" = games.id 
      JOIN categories ON games."categoryId" = categories.id 
      ${customerId ? `WHERE customers.id = ${+customerId}` : ""}
      ${gameId ? `WHERE games.id = ${+gameId}` : ""};`;

    const { rows: rentalsSQL } = await connection.query(query);

    const rentals = rentalsSQL.map((rental) => {
      const {
        id,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customerId,
        customerName,
        gameName,
        categoryId,
        categoryName,
      } = rental;

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
          categoryId,
          categoryName,
        },
      };
    });
    res.send(rentals);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function rentalsReturn(req, res) {
  const { returnDate, delayFee, id } = req.rental;

  try {
    await connection.query(
      'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;',
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
