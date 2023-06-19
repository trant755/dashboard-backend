const { getRowCount } = require("../../helpers/getRowCount");

const disabledAll = async (req, res) => {
  try {
    const { district } = req.params;

    const districtAll_stats = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%' AND type = 'ЦНАП'`
    );

    const districtAll_stats_opened = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%' AND type = 'ЦНАП' AND open = 1`
    );

    const finalArr = [
      districtAll_stats.length,
      districtAll_stats_opened.length,
    ];

    return res.status(200).json({
      message: "CAS All",
      code: 200,
      data: finalArr,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { disabledAll };
