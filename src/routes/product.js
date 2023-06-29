import express from "express";
import controllers from "../controllers";

const {productCotroller} = controllers;
const router = express.Router();

router.post("/vendor/upload",productCotroller.uploadProduct);
router.get("/product-list",productCotroller.productList);
router.post("/productById",productCotroller.productListById);
router.post("/productRemoveById",productCotroller.productRemoveById);
router.post("/more-products",productCotroller.moreProducts);

export default router;