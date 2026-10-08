import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { globalErrorHandler } from "./middlewares/globalErrorhandler.js";
import { PORT } from "./config/envConfig.js";
import router from "./routes/v1/index.js";
import { AppError } from "./utils/errors/AppError.js";

const app = express();

// Middlewares
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "booking-service is alive",
    });
});

// API routes
app.use("/api", router);

// Handle unknown routes
app.use((req, res, next) => {
    next(
        new AppError(
            `Route ${req.originalUrl} not found`,
            404
        )
    );
});

// Global error handler
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Booking service running on port ${PORT}`);
});

export default app;