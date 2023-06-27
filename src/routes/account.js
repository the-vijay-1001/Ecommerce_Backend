import express from 'express';
import validations from '../validations/index.js';
import middlewares from '../middlewares/index.js';
import controllers from '../controllers/index.js';

const router = express.Router();

const { accountValidator } = validations;
const { validateMiddleware } = middlewares;
const { accountController } = controllers;

router.post('/vendor/signup',
    validateMiddleware({ schema: accountValidator.userCreateSchema }), accountController.vendorSignup);


router.post('/vendor/signin',
    validateMiddleware({ schema: accountValidator.loginSchema }), accountController.vendorSignin);
    
router.post("/vendor/vendor-update",accountController.vendorUpdateProfile);
export default router;