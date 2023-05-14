import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  postCustomers,
} from "../controllers/customer.controller.js";
import { customerExistById } from "../middlewares/customerExistById.middleware.js";
import { customerIsValid } from "../middlewares/customerIsValid.middleware.js";
import { customerExistByCPF } from "../middlewares/customerExistByCPF.middleware.js";

const router = express();

router.get("/customers", getAllCustomers);
router.get("/customers/:id", customerExistById, getCustomerById);
router.post("/customers", customerIsValid, customerExistByCPF, postCustomers);

export default router;
