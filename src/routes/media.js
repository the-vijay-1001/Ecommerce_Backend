import { Router } from 'express';
import multer from 'multer';
import controllers from '../controllers';
const router = Router();

const {mediaController} = controllers;

router.post('/media/upload/:mediaType/:mediaFor',mediaController.uploadFile,mediaController.saveFile)
export default router;