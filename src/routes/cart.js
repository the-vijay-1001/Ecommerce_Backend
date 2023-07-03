import express from "express";
import controllers from "../controllers";

const {cartController} = controllers;
const router = express.Router();

router.post("/add-to-cart",cartController.addToCart);
router.post("/cart-list",cartController.list);
router.post("/remove-product",cartController.removeFromCart);

export default router;