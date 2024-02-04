import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
dotenv.config();

mongoose
   .connect(process.env.MONGO)
   .then(() => {
      console.log("mongodb is connected")
   })
   .catch(error => {
      console.log("Connection error: " + error)
   })


const app = express();

app.listen(3000, () => {
   console.log('Example app listening on port 3000!');
});

app.use("/api/user",userRoutes);

app.use("*", (res, req) => {
   res.send(200).json({message: "404 is not found!"});
})