import express from "express";
import { rentalIsValid } from "../middlewares/rentalIsValid.middleware.js";
import { getRentals, postRentals } from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/rentals", rentalIsValid, postRentals);
router.get("/rentals", getRentals);

export default router;
