import express from "express";
import { rentalIsValid } from "../middlewares/rentalIsValid.middleware.js";
import { postRentals } from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/rentals", rentalIsValid, postRentals);

export default router;
