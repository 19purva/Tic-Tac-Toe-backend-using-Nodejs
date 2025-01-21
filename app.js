import express from 'express';
import {config} from "dotenv";
import cors from "cors";
import {connection} from './database/connection.js';
import authRoutes from './Routes/authRoutes.js';
import gameRoutes from './Routes/gameRoutes.js';

const app=express();
config({path:"./config/config.env"})
console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.use(cors ({
origin:[process.env.FRONTEND_URI],
methods:["GET","POST","PUT","DELETE"],
credentials:true,
}));

app.use(express.json());
connection();

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);


export default app;