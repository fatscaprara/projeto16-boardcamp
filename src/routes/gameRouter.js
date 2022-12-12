import express from "express";
import { gameValidate } from "../middlewares/gameValidateMiddleware.js";
import { getGames, postGames } from "../controllers/gameController.js";

const router = express.Router();

router.post("/games", gameValidate, postGames);
router.get("/games", getGames);

export default router;
