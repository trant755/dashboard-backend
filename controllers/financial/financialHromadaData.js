const { pool } = require("../../models/connection");
const { querys } = require("../../models/querys");

const financialHromadaData = async (req, res, next) => {
  const { hromada } = req.params;

  try {
    pool.query(
      `SELECT * FROM budget_dash WHERE nazva_hromady = '${hromada}'`,
      function (err, result, fields) {
        if (err) {
          return res.status(404).json({
            message: "not found",
            code: 404,
            data: err,
          });
        }

        res.status(200).json({
          message: "financial hromada",
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

module.exports = { financialHromadaData };

//     $hromada = $_POST['hromada'];

//     $sql = "SELECT * FROM budget_dash WHERE nazva_hromady = '$hromada'";
//     $result = mysqli_query($conn, $sql);
//     $row = mysqli_fetch_array($result);

//     header('Content-Type: application/json');

//     echo json_encode($row);

// ?>
