import { pgTable, serial, integer, varchar, numeric, timestamp } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  userEmail: varchar("user_email", { length: 150 }).notNull(),
  flightId: varchar("flight_id", { length: 100 }).notNull(),
  seatNumber: varchar("seat_number", { length: 10 }).notNull(),
  passengerName: varchar("passenger_name", { length: 150 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 20 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});