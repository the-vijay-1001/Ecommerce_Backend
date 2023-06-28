import express from "express";
import controllers from "../controllers";

const {categoryController} = controllers;

const router = express.Router();

router.post("/add-category",categoryController.addCategory);
router.get("/category-list",categoryController.categoryList);

export default router;