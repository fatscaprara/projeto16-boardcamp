import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import categorieRouter from "./routes/categorieRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(categorieRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening in port: ${port}`);
});
