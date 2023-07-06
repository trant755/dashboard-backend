const {
  generateQueryStringFromArray,
} = require("../../helpers/generateTemplateString");
const { getRowCount } = require("../../helpers/getRowCount");

const getDataForBar = async (req, res, next) => {
  const { table } = req.params;
  const { targetColumn, conditions, method } = req.query;

  console.log("targetColumn:", targetColumn);
  console.log("conditions:", conditions);

  try {
    const getRequestData = (targetColumn, conditions, method) => {
      // targetColumn: type/type
      // conditions: type - ЦНАП / type - ЦНАП, open - 1

      const allColumns = targetColumn.split("/");

      const allConditions = conditions.split("/").map((item) => {
        return item.split(",").map((item) => item.split("-"));
      });

      console.log("allColumns:", allColumns);
      console.log("allConditions:", allConditions);

      // const querySettingsArr = allColumns.map((item, index) => {
      //   console.log("index:", index);

      //   const settingsObj = {};
      //   settingsObj.column = item;
      //   settingsObj.condition = allConditions[index].map((item) => ({
      //     key: item[0],
      //     value: item[1],
      //   }));

      //   console.log("****settingsObj:", settingsObj.condition);

      //   return settingsObj;
      // });

      // return querySettingsArr;

      return allConditions;
    };

    const querySearchArray = getRequestData(targetColumn, conditions);

    console.log("++allConditions:", querySearchArray);
    console.log("--querySearchArray", querySearchArray);

    const getDatasArr = async () => {
      const resArr = [];

      for (const element of querySearchArray) {
        console.log("element:", element);

        const queryString = generateQueryStringFromArray(table, element);

        console.log("queryString:", queryString);
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
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getDataForBar };
