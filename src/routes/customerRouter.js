import express from "express";
import {
  getCustomers,
  getCustomersById,
  postCustomers,
  putCustomersById,
} from "../controllers/customerController.js";
import { customerExistValidate } from "../middlewares/customerExistValidateMiddleware.js";
import { customerValidate } from "../middlewares/customerValidateMiddleware.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", customerExistValidate, getCustomersById);
router.post("/customers", customerValidate, postCustomers);
router.put("/customers/:id", customerValidate, putCustomersById);

export default router;
