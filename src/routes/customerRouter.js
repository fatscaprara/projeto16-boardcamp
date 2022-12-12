import express from "express";
import {
  getCustomers,
  getCustomersById,
  postCustomers,
} from "../controllers/customerController.js";
import { customerExistValidate } from "../middlewares/customerExistValidateMiddleware.js";
import { customerValidate } from "../middlewares/customerValidateMiddleware.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", customerExistValidate, getCustomersById);
router.post("/customers", customerValidate, postCustomers);

export default router;
