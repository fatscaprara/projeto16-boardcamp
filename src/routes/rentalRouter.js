import express from "express";
import { getRentals, postRentals } from "../controllers/rentalController.js";
import { validateRentals } from "../middlewares/validateRentalsMiddleware.js";

const router = express.Router();

router.post("/rentals", validateRentals, postRentals);
router.get("/rentals", getRentals);

export default router;
