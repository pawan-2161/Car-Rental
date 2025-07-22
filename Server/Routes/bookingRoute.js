import express from "express";
import { checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings, updateOwnerBookingStatus } from "../Controllers/bookingController.js";
import { protect } from "../Middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.post('/user', protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.post('/change-status', protect, updateOwnerBookingStatus)

export default bookingRouter;