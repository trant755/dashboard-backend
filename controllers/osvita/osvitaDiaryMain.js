const { pool } = require("../../models/connection");

const getCount = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length);
      }
    });
  });
};

const osvitaDiaryMain = async (req, res) => {
  try {

    const allDiaryFactCount = await getCount(
      "SELECT * FROM e_doc WHERE e_diary = 1"
    );
    
    const allDiaryPlanCount = await getCount("SELECT * FROM e_doc");

    const finalArr = [allDiaryFactCount, allDiaryPlanCount];

    return res.status(200).json({
      message: "main diary osvita",
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

module.exports = { osvitaDiaryMain };
