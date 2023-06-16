import express from 'express';
import{Bootstrap}  from './bootstrap.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.set('port',process.env.PORT || 5000);
const bootstrap = new Bootstrap(app);