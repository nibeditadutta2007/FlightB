import express from "express";
import bookingRouter from "./bookingRoutes.js";

const router = express.Router();

router.use("/bookings", bookingRouter);

export default router;