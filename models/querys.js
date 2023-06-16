const querys = {
  allTables: "SHOW TABLES",
  allShelters: "SELECT * FROM zaktable",
  sheltersOkayAndBezpereshkodnyi:
    "SELECT * FROM zaktable WHERE okay = 'придатна' AND bezpereshkodnyi = 'так'",
};

module.exports = { querys };
