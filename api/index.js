import express from "express";
import mongoose from "mongoose"
import env from "dotenv";
const app = express();

env.config();
const PORT = process.env.PORT || 3000;


// console.log(process.env.MONGODB_KEY)

mongoose.connect(process.env.MONGODB_KEY)
.then(() => {
  console.log("mongodb is connected")
  app.listen(PORT, () => {
    console.log("Server is running at port 3000")
  })
})
.catch(error => {
  throw new Error(error);
})

// console.log(process.env)
