import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

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