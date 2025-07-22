import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Car from "../Models/Car.js";

//  Fix: Typo in variable name
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' }); // payload should be an object!
};

//  Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: 'Fill all the fields and ensure password is at least 8 characters' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id.toString());

    res.json({ success: true, token, user});
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token, user});
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  Get user data using JWT token middleware (assumes middleware sets req.user)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user});
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  Get all cars for the fronend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json({success: true, cars})
  }catch (error){
    console.log(error.message)
    res.json({success: false, message: error.message})
  }

};
