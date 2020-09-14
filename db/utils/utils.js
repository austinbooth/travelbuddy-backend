exports.formatDates = (arr) => {
  const reformattedArr = arr.map((obj) => {
    const objCopy = { ...obj };
    const psqlTimestamp = new Date(objCopy.created_at);
    objCopy.created_at = psqlTimestamp;
    return objCopy;
  });
  return reformattedArr;
}

exports.makeRefObj = (arr, prop, value) => {
  const refObj = {};
  arr.forEach(item => {
    refObj[item[prop]] = item[value]; 
  })
  return refObj;
}