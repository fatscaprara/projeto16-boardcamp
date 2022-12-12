import express from "express";
import { gameValidate } from "../middlewares/gameValidateMiddleware.js";
import { postGames } from "../controllers/gameController.js";

const router = express.Router();

router.post("/games", gameValidate, postGames);

export default router;
