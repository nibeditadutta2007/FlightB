import BookingRepository from "../repositories/bookingRepository.js";

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        const booking = await this.bookingRepository.create(data);

        return booking;
    }

    async getBookingById(id) {
        const booking = await this.bookingRepository.findById(id);

        if (!booking) {
            throw new Error("Booking not found");
        }

        return booking;
    }

    async getAllBookings() {
        return await this.bookingRepository.findAll();
    }

    async updateBooking(id, data) {
        const booking = await this.bookingRepository.findById(id);

        if (!booking) {
            throw new Error("Booking not found");
        }

        return await this.bookingRepository.update(id, data);
    }

    async cancelBooking(id) {
        const booking = await this.bookingRepository.findById(id);

        if (!booking) {
            throw new Error("Booking not found");
        }

        return await this.bookingRepository.update(id, {
            status: "cancelled"
        });
    }
}

export default BookingService;