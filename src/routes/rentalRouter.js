import express from "express";
import { postRentals } from "../controllers/rentalController.js";
import { validateRentals } from "../middlewares/validateRentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", validateRentals, postRentals);

export default router;
