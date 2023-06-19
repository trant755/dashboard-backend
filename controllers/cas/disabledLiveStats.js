const { getRowCount } = require("../../helpers/getRowCount");

const disabledLiveStats = async (req, res) => {
  try {
    const { district } = req.params;

    const result = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%'`
    );

    const pandus = [];
    const temp_place = [];
    const stairs = [];
    const snitar_room = [];
    const brail = [];
    const tech_sol = [];

    for (let i = 0; i < result.length; i++) {
      const row = result[i];

      pandus.push(row.pandus);
      temp_place.push(row.temp_place);
      stairs.push(row.stairs);
      snitar_room.push(row.snitar_room);
      brail.push(row.brail);
      tech_sol.push(row.tech_sol);
    }

    const finalArr = [pandus, temp_place, stairs, snitar_room, brail, tech_sol];

    res.status(200).json({
      message: "CAS live stats by district",
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

module.exports = {
  disabledLiveStats,
};
