import express from "express";
import {
  getRentals,
  postRentals,
  rentalsDelete,
  rentalsReturn,
} from "../controllers/rentalController.js";
import { rentalsReturnValidate } from "../middlewares/rentalsReturnValidateMiddleware.js";
import { validateRentals } from "../middlewares/validateRentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", validateRentals, postRentals);
router.get("/rentals", getRentals);
router.post("/rentals/:id/return", rentalsReturnValidate, rentalsReturn);
router.delete("/rentals/:id", rentalsReturnValidate, rentalsDelete);

export default router;
