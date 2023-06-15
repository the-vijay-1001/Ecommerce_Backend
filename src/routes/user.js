import { Router } from "express";
import middlewares from "../middlewares/index.js";
import userController from "../controllers/user-controller.js";

const router = Router();

const {
    authValidate
} = middlewares;
