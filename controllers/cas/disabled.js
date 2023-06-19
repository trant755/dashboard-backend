const { getRowCount } = require("../../helpers/getRowCount");

const disabled = async (req, res) => {
  try {
    const resultOpenAll = await getRowCount("SELECT * FROM cas WHERE open = 1");
    let tsnapOpenAll = 0;

    if (resultOpenAll.length > 0) {
      tsnapOpenAll = resultOpenAll.length;
    } else {
      throw new Error("0 results");
    }

    tsnapOpenAll += 2;

    const resultOpen = await getRowCount(
      "SELECT * FROM cas WHERE open = 1 AND type = 'ЦНАП'"
    );
    let tsnapOpen = 0;

    if (resultOpen.length > 0) {
      tsnapOpen = resultOpen.length;
    } else {
      throw new Error("0 results");
    }

    const resultClosed = await getRowCount(
      "SELECT * FROM cas WHERE open = 0 AND type = 'ЦНАП'"
    );
    let tsnapClosed = 0;

    if (resultClosed.length > 0) {
      tsnapClosed = resultClosed.length;
    } else {
      throw new Error("0 results");
    }

    const resultTypeTSNAP = await getRowCount(
      "SELECT * FROM cas WHERE type = 'ЦНАП' AND open = 1"
    );
    let typeTSNAP = 0;

    if (resultTypeTSNAP.length > 0) {
      typeTSNAP = resultTypeTSNAP.length;
    }

    const resultTypeTP = await getRowCount(
      "SELECT * FROM cas WHERE type = 'ТП'"
    );
    let typeTP = 0;

    if (resultTypeTP.length > 0) {
      typeTP = resultTypeTP.length;
    }

    const resultTypeVRM = await getRowCount(
      "SELECT * FROM cas WHERE type = 'ВРМ'"
    );
    let typeVRM = 0;

    if (resultTypeVRM.length > 0) {
      typeVRM = resultTypeVRM.length;
    }

    typeVRM -= 1;

    const resultTypeDia = await getRowCount(
      "SELECT * FROM cas WHERE type ='Дія Центр'"
    );
    let typeDia = 0;

    if (resultTypeDia.length > 0) {
      typeDia = resultTypeDia.length;
    }

    const allRegions = [
      "Берегівський",
      "Мукачівський",
      "Рахівський",
      "Тячівський",
      "Ужгородський",
      "Хустський",
    ];

    const regionResults = [];
    const final = [];

    for (let i = 0; i < allRegions.length; i++) {
      const currentRegion = allRegions[i];

      const currentRegionResult = await getRowCount(
        `SELECT * FROM cas WHERE district = '${currentRegion}'`
      );
      const tempResult = [];

      const pandus = [];
      const tempPlace = [];
      const stairs = [];
      const sanitarRoom = [];
      const brail = [];
      const techSol = [];

      let rowQuant = 1;

      currentRegionResult.forEach((rowReg) => {
        pandus.push(rowReg.pandus);
        tempPlace.push(rowReg.temp_place);
        stairs.push(rowReg.stairs);
        sanitarRoom.push(rowReg.snitar_room);
        brail.push(rowReg.brail);
        techSol.push(rowReg.tech_sol);

        rowQuant++;
      });

      tempResult.push(pandus.reduce((a, b) => a + b, 0));
      tempResult.push(tempPlace.reduce((a, b) => a + b, 0));
      tempResult.push(stairs.reduce((a, b) => a + b, 0));
      tempResult.push(sanitarRoom.reduce((a, b) => a + b, 0));
      tempResult.push(brail.reduce((a, b) => a + b, 0));
      tempResult.push(techSol.reduce((a, b) => a + b, 0));

      const rating =
        (100 / (rowQuant * 6)) * tempResult.reduce((a, b) => a + b, 0);

      final.push(rating);
    }

    const allHromadas = [
      "Великобийганська",
      "Вилоцька",
      "Виноградівська",
      "Батівська",
      "Пийтерфолвівська",
      "Королівська",
      "Великоберезька",
      "Камянська",
      "Берегівська",
      "Косоньська",
      "Івановецька",
      "Полянська",
      "Мукачівська",
      "Верхньокоропецька",
      "Неліпинська",
      "Великолучківська",
      "Горондівська",
      "Жденіївська",
      "Кольчинська",
      "Нижньоворітська",
      "Свалявська",
      "Чинадіївська",
      "Воловецька",
      "Великобичківська",
      "Рахівська",
      "Ясінянська",
      "Богданська",
      "Усть-Чорнянська",
      "Углянська",
      "Вільховецька",
      "Нересницька",
      "Бедевлянська",
      "Тячівська",
      "Солотвинська",
      "Буштинська",
      "Дубівська",
      "Тересвянська",
      "Оноківська",
      "Перечинська",
      "Турє-Реметівська",
      "Чопська",
      "Середнянська",
      "Сюртівська",
      "Дубриницько-Малоберезнянська",
      "Костринська",
      "Ставненська",
      "Ужгородська",
      "Холмківська",
      "Баранинська",
      "Великоберезнянська",
      "Великодобронська",
      "Колочавська",
      "Драгівська",
      "Керецьківська",
      "Зарічанська",
      "Синевирська",
      "Горінчівська",
      "Міжгірська",
      "Іршавська",
      "Білківська",
      "Вишківська",
      "Пилипецька",
      "Хустська",
      "Довжанська",
    ];

    const hromadaArr = [];
    const finalResult = [];

    for (let i = 0; i < allHromadas.length; i++) {
      const currentHromada = allHromadas[i];

      const hromadaRating = await getRowCount(
        `SELECT * FROM cas WHERE hromada = '${currentHromada}'`
      );

      hromadaArr.push(currentHromada);

      const tempHromadaResult = [];
      const pandus = [];
      const tempPlace = [];
      const stairs = [];
      const snitarRoom = [];
      const brail = [];
      const techSol = [];

      let rowHromadaQuant = 1;

      hromadaRating.forEach((row) => {
        pandus.push(row.pandus);
        tempPlace.push(row.temp_place);
        stairs.push(row.stairs);
        snitarRoom.push(row.snitar_room);
        brail.push(row.brail);
        techSol.push(row.tech_sol);

        rowHromadaQuant++;
      });

      tempHromadaResult.push(pandus.reduce((a, b) => a + b, 0));
      tempHromadaResult.push(tempPlace.reduce((a, b) => a + b, 0));
      tempHromadaResult.push(stairs.reduce((a, b) => a + b, 0));
      tempHromadaResult.push(snitarRoom.reduce((a, b) => a + b, 0));
      tempHromadaResult.push(brail.reduce((a, b) => a + b, 0));
      tempHromadaResult.push(techSol.reduce((a, b) => a + b, 0));

      const rating =
        (100 / (6 * (rowHromadaQuant - 1))) *
        tempHromadaResult.reduce((a, b) => a + b, 0);

      finalResult.push(rating);
    }

    const exportingArr = [finalResult, hromadaArr];

    const tsnapNumber = tsnapOpen + tsnapClosed;

    const openedAndClosed = [
      tsnapNumber,
      tsnapOpen,
      tsnapClosed,
      typeTSNAP,
      typeTP,
      typeVRM,
      typeDia,
      tsnapOpenAll,
    ];

    return res.status(200).json({
      message: "CAS",
      code: 200,
      data: {
        exportingArr: exportingArr,
        rating: final,
        openedAndClosed: openedAndClosed,
      },
    });
  } catch (err) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
      data: err,
    });
  }
};

module.exports = { disabled };
