const { getRowCount } = require("../../helpers");

const getSumDataForBar = async (req, res) => {
  try {
    console.log("req.params", req.query);
    const { district } = req.query;

    // const query = `SELECT SUM(pandus) + SUM(temp_place) +S UM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) as totalCount, COUNT(pandus) + COUNT(temp_place) + COUNT(stairs) + COUNT(snitar_room) + COUNT(brail) + COUNT(tech_sol) as totalCount2ttttt FROM cas GROUP BY district`;

    // const query = `SELECT SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) as totalCount SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) as totalCount2ttttt FROM cas WHERE district = '${district}'`;

    const query = `SELECT district, (totalCount / totalCount2 * 100) AS result
FROM (
    SELECT
         district, SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) AS totalCount,
        COUNT(pandus) + COUNT(temp_place) + COUNT(stairs) + COUNT(snitar_room) + COUNT(brail) + COUNT(tech_sol) AS totalCount2
   FROM cas GROUP BY district
) AS subquery;`;

    // const query = `SELECT SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) as totalCount SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) as totalCount2ttttt FROM cas WHERE district = '${district}'`;

    console.log("query:", query);

    const sum = await getRowCount(query);
    console.log("sum:", sum);

    return res.status(200).json({
      message: "summ data",
      code: 200,
      data: sum,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { getSumDataForBar };
