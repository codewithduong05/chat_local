import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error({
    method: req.method,
    path: req.originalUrl,
    status: err.status || 500,
    duration: "N/A",
    ip: req.ip,
    userId: req.user?.id,
    error: err.message,
  });

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
