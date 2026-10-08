import "dotenv/config";

export const PORT = process.env.PORT || 4003;

export const NODE_ENV = process.env.NODE_ENV || "development";

export const DATABASE_URL = process.env.DATABASE_URL;

export const MESSAGE_BROKER_URL =
    process.env.MESSAGE_BROKER_URL || "amqp://localhost:5672";

export const EXCHANGE_NAME =
    process.env.EXCHANGE_NAME || "FLIGHT_BOOKING_EXCHANGE";

export const FLIGHT_SERVICE_URL =
    process.env.FLIGHT_SERVICE_URL || "http://localhost:4002";

export const AUTH_SERVICE_URL =
    process.env.AUTH_SERVICE_URL || "http://localhost:4001";

export const REMAINDER_BINDING_KEY =
    process.env.REMAINDER_BINDING_KEY || "CREATE_TICKET";