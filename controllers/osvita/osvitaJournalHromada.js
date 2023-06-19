const { pool } = require("../../models/connection");

const getRowCount = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const osvitaJournalHromada = async (req, res) => {
  try {
    const { district, hromada } = req.params;

    const district_journal_fact = await getRowCount(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND e_zhurnal = 1 AND hromada LIKE '%${hromada}%'`
    );

    const district_journal_plan = await getRowCount(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%'`
    );

    const no_journal_school = await getRowCount(
      `SELECT * FROM e_doc WHERE district LIKE '%${district}%' AND e_zhurnal = 0 AND hromada LIKE '%${hromada}%'`
    );

    const final_arr = [
      district_journal_fact.length,
      district_journal_plan.length,
      no_journal_school.map((row) => row.name),
    ];

    return res.status(200).json({
      message: "District data",
      code: 200,
      data: final_arr,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { osvitaJournalHromada };
