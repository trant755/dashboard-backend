const typeCont = (column, result) => {
  const keyName = column; // Specify the key name dynamically

  const data = result.reduce((acc, obj) => {
    const key = obj[keyName];

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Convert the object into an array of objects with the required format
  const newResult = Object.entries(data).map(([key, value]) => ({
    [key]: value,
  }));

  return newResult;
};

module.exports = { typeCont };
