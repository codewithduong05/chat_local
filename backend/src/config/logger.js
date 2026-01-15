function format(level, data) {
  const time = new Date().toISOString();

  return `[${level}] ${time} ${data.method} ${data.path} ${
    data.status
  } ${data.duration} ip=${data.ip}${
    data.userId ? " user=" + data.userId : ""
  }`;
}

const logger = {
  info(data) {
    console.log(`${format("INFO", data)}`);
  },
  warn(data) {
    console.warn(`${format("WARN", data)}`);
  },
  error(data) {
    console.error(`${format("ERROR", data)}`);
  },
};

export default logger;
