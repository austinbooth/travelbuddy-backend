exports.formatDates = (arr) => {
  const reformattedArr = arr.map((obj) => {
    const objCopy = { ...obj };
    const psqlTimestamp = new Date(objCopy.created_at);
    objCopy.created_at = psqlTimestamp;
    return objCopy;
  });
  return reformattedArr;
}