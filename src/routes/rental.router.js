import express from "express";
import { rentalIsValid } from "../middlewares/rentalIsValid.middleware.js";
import {
  finalizeRental,
  getRentals,
  postRentals,
} from "../controllers/rental.controller.js";
import { rentalExist } from "../middlewares/rentalExist.middleware.js";

const router = express.Router();

router.post("/rentals", rentalIsValid, postRentals);
router.get("/rentals", getRentals);
router.post("/rentals/:id/return", rentalExist, finalizeRental);

export default router;
