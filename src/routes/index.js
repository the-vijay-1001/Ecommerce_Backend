import { Router } from 'express';
import account from './account.js'
import admin from './admin'
import media from './media'
import user from "./user.js"
import product from "./product.js";
import HttpStatus from 'http-status';
import cart from './cart.js';
import category from './category.js';

const router = Router();
const register = (app) => {
    app.use(router);
    router.use('/', [
        account,
        admin,
        media,
        user,
        product,
        category,
        cart
    ])
    app.use((error, req, res, next) => {
        console.log(error)
       return  res.status(HttpStatus.BAD_REQUEST).json({
            status: false,
            errorMsg: error.message
        })
    })
}

export default register;