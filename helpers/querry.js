const querryGen = (data) => {
  return Object.keys(data).join("=?,") + "=?";
};

module.exports = querryGen