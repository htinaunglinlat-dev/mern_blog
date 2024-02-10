import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'; 

const app = express();

dotenv.config();

mongoose
   .connect(process.env.MONGO)
   .then(() => {
      console.log("mongodb is connected")
   })
   .catch(error => {
      console.log("Connection error: " + error)
   })

app.listen(3000, () => {
   console.log('Sever is listening on port 3000!');
});

app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use((error, req, res, next) => {
   const statusCode = error.statusCode || 500;
   const message = error.message || "Internal Server Error";
   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
})