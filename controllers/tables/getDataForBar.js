const { getRowCount } = require("../../helpers/getRowCount");
const { getQueryStringFromArray } = require("../../helpers");

const getDataForBar = async (req, res, next) => {
  const { table } = req.params;
  const { conditions, method } = req.query;

  try {
    const getRequestData = (conditions, method) => {
      const allConditions = conditions.split("/").map((item) => {
        return item.split(",").map((item) => item.split("-"));
      });

      return allConditions;
    };

    const querySearchArray = getRequestData(conditions);

    const getDatasArr = async () => {
      const resArr = [];

      for (const element of querySearchArray) {
        const queryString = getQueryStringFromArray(table, element);
        const data = await getRowCount(queryString);
        resArr.push(data.length);
      }

      return resArr;
    };

    const result = await getDatasArr();

    res.status(200).json({
      message: "table data",
      code: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = { getDataForBar };
