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
   console.log('Example app listening on port 3000!');
});

app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use("*", (res, req) => {
   res.send(200).json({message: "404 is not found!"});
})