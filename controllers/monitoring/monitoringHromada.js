const { getRowCount } = require("../../helpers/getRowCount");

const monitoringHromada = async (req, res) => {
  const { district, hromada } = req.params;

  try {
    const result = await getRowCount(
      `SELECT * FROM monitoring WHERE district LIKE '%${district}%' AND hromada LIKE '%${hromada}%'`
    );

    let prog_dost_dev = 0;
    let prog_dost_ready = 0;
    let prog_dost_agreed = 0;

    let finance = 0;

    let plan_zakhodiv_dev = 0;
    let plan_zakhodiv_ready = 0;
    let plan_zakhodiv_agreed = 0;

    let street_perekhrest_obstezheno = 0;
    let street_perekhrest_obstezheno_usuneno = 0;

    let admin_obstezheno = 0;
    let admin_usuneno = 0;

    let soc_obstezheno = 0;
    let soc_usuneno = 0;

    let med_obstezheno = 0;
    let med_usuneno = 0;

    let osvita_obstezheno = 0;
    let osvita_usuneno = 0;

    let shelterobj_obstezheno = 0;
    let shelterobj_usuneno = 0;

    result.forEach((row) => {
      if (row.prog_dost_dev === "1") {
        prog_dost_dev += parseInt(row.prog_dost_dev);
      }

      if (row.prog_dost_ready === "1") {
        prog_dost_ready += parseInt(row.prog_dost_ready);
      }

      if (row.prog_dost_agreed === "1") {
        prog_dost_agreed += parseInt(row.prog_dost_agreed);
      }

      if (row.finance !== "-" && row.finance !== "") {
        finance += parseInt(row.finance);
      }

      if (row.plan_zakhodiv_dev === "1") {
        plan_zakhodiv_dev += parseInt(row.plan_zakhodiv_dev);
      }

      if (row.plan_zakhodiv_ready === "1") {
        plan_zakhodiv_ready += parseInt(row.plan_zakhodiv_ready);
      }

      if (row.plan_zakhodiv_agreed === "1") {
        plan_zakhodiv_agreed += parseInt(row.plan_zakhodiv_agreed);
      }

      if (row.street_perekhrest_obstezheno === "1") {
        street_perekhrest_obstezheno += parseInt(
          row.street_perekhrest_obstezheno
        );
      }

      if (row.street_perekhrest_obstezheno_usuneno === "1") {
        street_perekhrest_obstezheno_usuneno += parseInt(
          row.street_perekhrest_obstezheno_usuneno
        );
      }

      if (row.admin_obstezheno !== "-" && row.admin_obstezheno !== "") {
        admin_obstezheno += parseInt(row.admin_obstezheno);
      }

      if (row.soc_usuneno !== "-" && row.soc_usuneno !== "") {
        soc_usuneno += parseInt(row.soc_usuneno);
      }

      if (row.med_obstezheno !== "-" && row.med_obstezheno !== "") {
        med_obstezheno += parseInt(row.med_obstezheno);
      }

      if (row.med_usuneno !== "-" && row.med_usuneno !== "") {
        med_usuneno += parseInt(row.med_usuneno);
      }

      if (row.osvita_obstezheno !== "-" && row.osvita_obstezheno !== "") {
        osvita_obstezheno += parseInt(row.osvita_obstezheno);
      }

      if (row.osvita_usuneno !== "-" && row.osvita_usuneno !== "") {
        osvita_usuneno += parseInt(row.osvita_usuneno);
      }

      if (
        row.shelterobj_obstezheno !== "-" &&
        row.shelterobj_obstezheno !== ""
      ) {
        shelterobj_obstezheno += parseInt(row.shelterobj_obstezheno);
      }

      if (row.shelterobj_usuneno !== "-" && row.shelterobj_usuneno !== "") {
        shelterobj_usuneno += parseInt(row.shelterobj_usuneno);
      }
    });

    const finalArr = [
      prog_dost_dev,
      prog_dost_ready,
      prog_dost_agreed,
      finance,
      plan_zakhodiv_dev,
      plan_zakhodiv_ready,
      plan_zakhodiv_agreed,
      street_perekhrest_obstezheno,
      street_perekhrest_obstezheno_usuneno,
      admin_obstezheno,
      admin_usuneno,
      soc_obstezheno,
      soc_usuneno,
      med_obstezheno,
      med_usuneno,
      osvita_obstezheno,
      osvita_usuneno,
      shelterobj_obstezheno,
      shelterobj_usuneno,
    ];

    return res.status(200).json({
      message: "Monitoring by district",
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

module.exports = { monitoringHromada };
