import dayjs from "dayjs";
import connection from "../database/database.js";

export async function rentalsReturnValidate(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: findRentalsById } = await connection.query(
      "SELECT * FROM rentals WHERE id = $1;",
      [id]
    );

    if (!findRentalsById?.length) {
      return res.sendStatus(404);
    }

    if (!findRentalsById[0].returnDate) {
      return res.sendStatus(400);
    }

    const pricePerDay =
      +findRentalsById[0].originalPrice / +findRentalsById[0].daysRented;

    const rentDate = dayjs(findRentalsById[0].rentDate);
    const daysDelayed = dayjs().diff(rentDate, "days");
    const delayFee = daysDelayed * pricePerDay;

    const returnDate = dayjs().format("YYYY-MM-DD");

    req.rental = { returnDate, delayFee, id };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
