import logger from "../config/logger.js";



function apiLogger(req, res, next) {
  const start = Date.now();

  // hook khi response kết thúc
  res.on("finish", () => {
    const duration = Date.now() - start;

    const logData = {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userId: req.user?.id || null,
    };

    if (res.statusCode >= 500) {
      logger.error(logData);
    } else if (res.statusCode >= 400) {
      logger.warn(logData);
    } else {
      logger.info(logData);
    }
  });

  next();
}

export default apiLogger
