import express from "express";
import { getAllCustomers } from "../controllers/customer.controller.js";

const router = express();

router.get("/customers", getAllCustomers);

export default router;
