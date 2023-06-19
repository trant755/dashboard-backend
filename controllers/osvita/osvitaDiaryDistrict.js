const { pool } = require("../../models/connection");

const executeQuery = (query, extractData = false, extractField = null) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (extractData && extractField) {
          const extractedData = results.map((row) => row[extractField]);
          resolve(extractedData);
        } else {
          resolve(results.length);
        }
      }
    });
  });
};

const osvitaDiaryDistrict = async (req, res) => {
  const { district } = req.params;

  try {
    const districtJournalFactCount = await executeQuery(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND e_diary = 1`
    );
    const districtJournalPlanCount = await executeQuery(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%'`
    );
    const noJournalSchools = await executeQuery(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND e_diary = 0`,
      true,
      "name"
    );

    const finalArr = [
      districtJournalFactCount,
      districtJournalPlanCount,
      noJournalSchools,
    ];

    return res.status(200).json({
      message: "osvita diary district",
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

module.exports = { osvitaDiaryDistrict };
