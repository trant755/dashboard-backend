const { getRowCount } = require("../../helpers");
const { knex } = require("../../models/connection");

const getDataForChartKnex = async (req, res) => {
  try {
    const { table } = req.params;
    console.log("table:", table);

    const searchConfig = {
      values: {
        totalCount:
          "SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol)",
        totalCount2:
          "COUNT(pandus) + COUNT(temp_place) + COUNT(stairs) + COUNT(snitar_room) + COUNT(brail) + COUNT(tech_sol)",
      },
      target: "district",
      math: "totalCount / totalCount2 * 100",
    };

    const sqlQueryText = `SELECT district, (totalCount / totalCount2 * 100) AS result
FROM (
    SELECT
         district, SUM(pandus) + SUM(temp_place) + SUM(stairs) + SUM(snitar_room) + SUM(brail) + SUM(tech_sol) AS totalCount,
        COUNT(pandus) + COUNT(temp_place) + COUNT(stairs) + COUNT(snitar_room) + COUNT(brail) + COUNT(tech_sol) AS totalCount2
   FROM cas GROUP BY district
) AS subquery;`;

    const generateSqlQuery = (data) => {
      // const subQuery = knex(table);
      const query = knex(table);
      const testQuery = knex(table);

      const values = Object.entries(data.values);
      const selectValues = values
        .map((item) => `${item[1]} as ${item[0]}`)
        .join(", ");

      query.select(data.target).select(selectValues).groupBy(data.target);
      console.log("*******", query.toQuery());

      // return query.toQuery();

      query
        .select(data.target)
        .select(`${data.math} AS result`)
        .from(subQuery.toQuery());

      // .from(`${subQuery.toQuery()} AS ${subQuery}`);

      testQuery.select("brail").where("brail", 1);

      return testQuery.toQuery();
      return query.toQuery();
    };

    const sqlQuery = await generateSqlQuery(searchConfig);
    console.log("++++sqlQuery:", sqlQuery);

    const finalResult = await getRowCount(sqlQuery);
    console.log("finalResult:", finalResult);

    return res.status(200).json({
      message: "data",
      code: 200,
      data: finalResult,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err.message,
    });
  }
};

module.exports = { getDataForChartKnex };

//1. надіслати 1 обєкт з саб запитами, викликати скільки разів потрібно саб функцію кнех та записати кожен з результатів в саб квері обєкт (чи повертати проміжкові результати на фронт)
//2.  передати  результати з саб квері обєкту в материнську функцію кнех, отримані запити повернути на фронт
