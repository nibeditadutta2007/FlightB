import { StatusCodes } from "http-status-codes";
import BookingService from "../services/bookingService.js";

const bookingService = new BookingService();

export const createBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.createBooking(req.body);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(
            req.params.id
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.getAllBookings();

        return res.status(StatusCodes.OK).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

export const updateBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.updateBooking(
            req.params.id,
            req.body
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Booking updated successfully",
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

export const cancelBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.cancelBooking(
            req.params.id
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking
        });
    } catch (error) {
        next(error);
    }
};