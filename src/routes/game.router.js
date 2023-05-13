import express from "express";
import { getAllGames, postGames } from "../controllers/game.controller.js";
import { gameIsValid } from "../middlewares/gameIsValid.middleware.js";
import { gameExist } from "../middlewares/gameExist.middleware.js";

const router = express.Router();

router.get("/games", getAllGames);
router.post("/games", gameIsValid, gameExist, postGames);

export default router;
