import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import categorieRouter from "./routes/categorieRouter.js";
import gameRouter from "./routes/gameRouter.js";
import customerRouter from "./routes/customerRouter.js";
import rentalRouter from "./routes/rentalRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(categorieRouter);
app.use(gameRouter);
app.use(customerRouter);
app.use(rentalRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening in port: ${port}`);
});
