import express from "express";
import {
  getCategories,
  postCategories,
} from "../controllers/categorieController.js";
import { categorieNameValidate } from "../middlewares/categorieNameValidateMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", categorieNameValidate, postCategories);

export default router;
