import { Router } from "express";
import account from "./account.js"
const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/', [
        account
    ])
}

export default register;