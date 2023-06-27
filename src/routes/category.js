import express from "express";
import controllers from "../controllers";

const {categoryController} = controllers;

const router = express.Router();

router.post("/add-category",categoryController.addCategory);

export default router;