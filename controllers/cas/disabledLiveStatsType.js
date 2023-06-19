const { getRowCount } = require("../../helpers/getRowCount");

const disabledLiveStatsType = async (req, res) => {
  try {
    const { hromada, type } = req.params;
    console.log(hromada, type);

    const casStats = await getRowCount(
      `SELECT * FROM cas WHERE hromada LIKE '%${hromada}%' AND type = '${type}'`
    );

    const finalResult = {
      pandus: [],
      temp_place: [],
      stairs: [],
      snitar_room: [],
      brail: [],
      tech_sol: [],
    };

    casStats.forEach((row) => {
      finalResult.pandus.push(row.pandus);
      finalResult.temp_place.push(row.temp_place);
      finalResult.stairs.push(row.stairs);
      finalResult.snitar_room.push(row.snitar_room);
      finalResult.brail.push(row.brail);
      finalResult.tech_sol.push(row.tech_sol);
    });

    return res.status(200).json({
      message: "CAS Stats by Hromada and Type",
      code: 200,
      data: finalResult,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { disabledLiveStatsType };
