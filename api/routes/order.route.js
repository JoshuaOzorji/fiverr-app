import { getOrders, intent, confirm } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/jwt.js";

import express from "express";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;
