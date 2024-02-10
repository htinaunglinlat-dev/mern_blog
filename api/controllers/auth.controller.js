import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   if(
      !username ||!email ||!password ||
      username === "" || email === "" || password === ""
   ) {
      return next(errorHandler(400, "All fields are required!"));
   }
   const hashPassword = bcrypt.hashSync(password, 10);
   console.log(hashPassword)
   const newUser = new User({
      username,
      email,
      password: hashPassword,
   })
   try {
      const user = await newUser.save()
      return res.status(201).json({"Signed up successfully!": user});
   } catch (error) {
      return next(error);
   }
}

export const signin = async (req, res, next) => {
   const { email, password } = req.body;
   if(!email || !password || email === "" || password === "") 
      return next(errorHandler(400, "All fields are required!"));
   try{
      const validUser = await User.findOne({ email: email });
      if(!validUser)
         return next(errorHandler(404, "User not found!"));
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if(!validPassword)
         return next(errorHandler(400, "Incorrect password!"));
      const token = jwt.sign(
         {userId: validUser._id},
         process.env.JWT_SECRET_KEY,
      )
      const { password: pass, ...rest } = validUser._doc;
      
      return res.status(200).cookie("access_token", token, {httpOnly: true}).json(rest)
   } catch(error) {
      return next(error)
   }

}