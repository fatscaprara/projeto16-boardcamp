import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import gameRouter from "./routes/game.router.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(gameRouter);

const port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Server running in port: ${port}`));
