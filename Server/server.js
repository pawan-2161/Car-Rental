import express from 'express'
import "dotenv/config";
import cors from "cors";
import connectDB from './configs/db.js';
import userRouter from './Routes/userRoutes.js';
import ownerRouter from './Routes/OwnerRoute.js';
import bookingRouter from './Routes/bookingRoute.js';

// Initialize Express App
const app = express()

// Connect Database
await connectDB()

//Middelware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> res.send("Server is running"))
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))