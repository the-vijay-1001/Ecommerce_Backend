import {Router} from "express";
import controller from "../controllers";
import validations from '../validations';
import middlewares from '../middlewares';


    
const 
router=Router();
const { userController } = controller;
const { userValidations } = validations;
const {validateMiddleware} = middlewares;


router.post('/signup',validateMiddleware({schema:userValidations.userProfileUpdateSchema}),userController.signUp);
router.post('/signin',validateMiddleware({schema:userValidations.userLoginUpdateSchema}),userController.signIn);
router.post("/user-update",userController.userUpdateProfile);
export default router;