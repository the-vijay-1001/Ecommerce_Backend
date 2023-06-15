import {Router} from "express";

const router = Router();

router.post("/media/upload/:mediaType/:mediaFor",(req,res,next)=>{
    console.log(req.body);
})

export default router;