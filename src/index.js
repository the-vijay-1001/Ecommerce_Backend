import express from "express";
import Bootstrap from "./bootstrap.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.set("port",process.env.PORT || 5000);
app.use(cors());
const bootstrap = new Bootstrap(app);