import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
   const { username, email, password } = req.body;
   if(
      !username ||!email ||!password ||
      username === "" || email === "" || password === ""
   ) {
      return res.status(400).json({message:"All fields are required!"});
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
      return res.status(500).json({"error": error.message});
   }
}