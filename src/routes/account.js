import express from "express";
import validations from "../validations/index.js";
import middlewares from "../middlewares/index.js";
import controllers from "../controllers/index.js";

const router = express.Router();

const { accountValidator } = validations;
const { validateMiddleware } = middlewares;
const { accountController } = controllers;

router.post("/signup",
    validateMiddleware({ schame: accountValidator.userCreateSchema }), accountController.userSignup);


router.post("/signin",
    validateMiddleware({ schame: accountValidator.loginSchema }), accountController.userSignin);
    
export default router;