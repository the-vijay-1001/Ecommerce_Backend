import express from "express";
import controllers from "../controllers";

const {cartController} = controllers;
const router = express.Router();

router.post("/add-to-cart",cartController.addToCart);
export default router;