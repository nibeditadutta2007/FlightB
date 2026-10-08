import express from "express";

import {
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    cancelBooking
} from "../../Controllers/bookingControllers.js";

const router = express.Router();
router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.patch("/:id", updateBooking);
router.delete("/:id", cancelBooking);
export default router;