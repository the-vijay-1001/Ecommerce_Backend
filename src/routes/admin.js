import express from 'express';
import middlewares from '../middlewares';
import validations from '../validations';
import controllers from '../controllers';
const router = express.Router();

const { validateMiddleware } = middlewares;
const { adminValidations } = validations;
const { adminController } = controllers;

router.post('/admin/signin', validateMiddleware({ schema: adminValidations.adminSignInSchema }), adminController.signin,(req, res, next) => {
    console.log(req.body);
})

router.post('/admin/forgot-password',validateMiddleware({schema:adminValidations.forgotPasswordSchema}),adminController.forgotPassword);

router.post('/admin/verify-password',adminController.verifyPassword);

router.post('/admin/update-password',adminController.updatePassword);
export default router;