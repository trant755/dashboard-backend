const { pool } = require("../../models/connection");
const { querys } = require("../../models/querys");

const getSheltersByParamsReusable = async (req, res, next) => {
  console.log(req.body);
  try {
    pool.query(
      querys.sheltersOkayAndBezpereshkodnyi,
      function (err, result, fields) {
        if (err) {
          return res.status(400).json({
            message: "error",
            code: 400,
            data: result,
          });
        }

        res.status(200).json({
          message: "main shelters",
          code: 200,
          length: result.length,
          data: result,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getSheltersByParamsReusable };
