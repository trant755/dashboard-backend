// const { Chart } = require("../models/orderModel");

const getAllCharts = async (req, res, next) => {
  try {
    // const result = await Order.find({});

    const result = "getAllCharts Controller";
    console.log(result);

    return res.status(200).json({
      message: "list of all charts",
      code: 200,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCharts };
