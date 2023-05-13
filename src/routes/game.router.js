import express from "express";
import { getAllGames } from "../controllers/game.controller.js";

const router = express.Router();

router.get("/games", getAllGames);

export default router;
