const dateToTimestamp = (date, type) => {
  let timestamp;

  if (type === "str") {
    timestamp = Date.parse(date);
    return timestamp / 1000;
  }
  return Math.round(new Date(date).getTime() / 1000);
};

module.exports = dateToTimestamp;
