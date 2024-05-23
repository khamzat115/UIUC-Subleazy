// everything related to logging in and registering users

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';

const router = express.Router();

router.post("/register", async (req, res) => { //request and response
    const { username, password } = req.body; // to register a user we need to get the username and password from the request body
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save(); // save the user to the database
    res.json({ message: "User registered successfully" });
  });

  router.post("/login", async (req, res) => { // async: 
    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ username }); // pause execution until you find the user or not
  
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username incorrect or User Doesn't Exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secrettt"); // babu
    res.json({ token, userID: user._id });
  });

export {router as UserRouter};