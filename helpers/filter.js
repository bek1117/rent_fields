const filterGen = (data) => {
  return Object.keys(data).join("=? and ") + "=?";
};

module.exports = filterGen;