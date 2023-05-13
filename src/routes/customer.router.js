import express from "express";
import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/customer.controller.js";
import { customerExistById } from "../middlewares/customerExistById.middleware.js";

const router = express();

router.get("/customers", getAllCustomers);
router.get("/customers/:id", customerExistById, getCustomerById);

export default router;
