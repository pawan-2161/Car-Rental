import express from "express"
import { getCars, getUserData, loginUser, registerUser } from "../Controllers/userController.js";
import { protect } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/info', protect, getUserData)
userRouter.get('/cars', getCars)


export default userRouter;