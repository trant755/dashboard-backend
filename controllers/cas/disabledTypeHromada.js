const { getRowCount } = require("../../helpers/getRowCount");

const disabledTypeHromada = async (req, res) => {
  try {
    const { district, hromada } = req.params;

    const type_cas = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%' AND type = 'ЦНАП'`
    );

    const type_tp = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%' AND type = 'ТП'`
    );

    const type_vrm = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%' AND type = 'ВРМ'`
    );

    const type_diia = await getRowCount(
      `SELECT * FROM cas WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%' AND type = 'Дія Центр'`
    );

    const finalArr = [
      type_cas.length,
      type_tp.length,
      type_vrm.length,
      type_diia.length,
    ];

    return res.status(200).json({
      message: "CAS Stats by type and hromada",
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

module.exports = { disabledTypeHromada };
