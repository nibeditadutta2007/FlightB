import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err, req, res, next) => {
    console.error(err);

    return res.status(
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    ).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err
    });
};