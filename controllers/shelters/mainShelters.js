const { getRowCount } = require("../../helpers/getRowCount");

const mainShelters = async (req, res) => {
  try {
    const sheltersCount = await getRowCount("SELECT * FROM zaktable");

    const niceSheltersCount = await getRowCount(
      "SELECT * FROM zaktable WHERE okay = 'придатна' AND bezpereshkodnyi = 'так'"
    );

    const bezpereshkodniCount = await getRowCount(
      "SELECT * FROM zaktable WHERE bezpereshkodnyi = 'так' AND okay = 'непридатна'"
    );

    const okayCount = await getRowCount(
      "SELECT * FROM zaktable WHERE okay = 'придатна' AND bezpereshkodnyi = 'ні'"
    );

    const badCount = await getRowCount(
      "SELECT * FROM zaktable WHERE okay = 'непридатна' AND bezpereshkodnyi = 'ні'"
    );

    const unworkedCount = await getRowCount(
      "SELECT * FROM zaktable WHERE okay = '' AND bezpereshkodnyi = ''"
    );

    const exportingResult = [
      sheltersCount.length,
      niceSheltersCount.length,
      bezpereshkodniCount.length,
      okayCount.length,
      badCount.length,
      unworkedCount.length,
    ];

    return res.status(200).json({
      message: "main shelters",
      code: 200,
      data: exportingResult,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { mainShelters };
