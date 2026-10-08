import { StatusCodes } from "http-status-codes";
import { eq, desc } from "drizzle-orm";
import { db } from "../config/dbConfig.js";
import { bookingsTable } from "../db/schema.js";
import { AppError } from "../utils/errors/AppError.js";

class BookingRepository {
    async create(data) {
        try {
            const [booking] = await db.insert(bookingsTable).values(data).returning();
            return booking;
        } catch (error) {
            
            if (error.code === "23505") {
                throw new AppError(
                    "RepositoryError",
                    "Duplicate booking",
                    "A booking with this value already exists",
                    StatusCodes.CONFLICT
                );
            }
            throw new AppError(
                "RepositoryError",
                "Cannot create Booking",
                "There was some issue creating the booking, please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async findById(id) {
        const [booking] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
        return booking || null;
    }

    async findAll() {
        return db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
    }

    async update(id, data) {
        try {
            const [booking] = await db
                .update(bookingsTable)
                .set(data)
                .where(eq(bookingsTable.id, id))
                .returning();

            return booking;
        } catch (error) {
            throw new AppError(
                "RepositoryError",
                "Cannot update booking",
                "There was some issue updating the booking, please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

export default BookingRepository;