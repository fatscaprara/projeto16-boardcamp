import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import gameRouter from "./routes/game.router.js";
import customerRouter from "./routes/customer.router.js";
import rentalRouter from "./routes/rental.router.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(gameRouter);
server.use(customerRouter);
server.use(rentalRouter);

const port = process.env.PORT || 5000;
server.listen(5000, () => console.log(`Server running in port: ${port}`));
