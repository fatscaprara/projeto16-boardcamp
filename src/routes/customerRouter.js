import express from "express";
import {
  getCustomers,
  getCustomersById,
} from "../controllers/customerController.js";
import { customerExistValidade } from "../middlewares/customerExistValidadeMiddleware.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", customerExistValidade, getCustomersById);

export default router;
