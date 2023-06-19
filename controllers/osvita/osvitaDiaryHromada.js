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

const osvitaDiaryHromada = async (req, res) => {
  const { district, hromada } = req.params;

  try {
    const districtJournalFact = await executeQuery(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND e_diary = 1 AND hromada LIKE '%${hromada}%'`
    );

    const districtJournalPlan = await executeQuery(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%'`
    );

    const noJournalSchool = await executeQuery(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND e_diary = 0 AND hromada LIKE '%${hromada}%'`,
      true,
      "name"
    );

    const finalArr = [
      districtJournalFact,
      districtJournalPlan,
      noJournalSchool,
    ];

    return res.status(200).json({
      message: "e_doc data",
      code: 200,
      data: finalArr,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      code: 500,
      data: error,
    });
  }
};

module.exports = { osvitaDiaryHromada };
