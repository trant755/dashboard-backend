const { getRowCount } = require("../../helpers/getRowCount");

const hromadas_arr = [
  "Великобийганська ТГ",
  "Вилоцька ТГ",
  "Виноградівська ТГ",
  "Батівська ТГ",
  "Пийтерфолвівська ТГ",
  "Королівська ТГ",
  "Великоберезька ТГ",
  "Камянська ТГ",
  "Берегівська ТГ",
  "Косоньська ТГ",
  "Івановецька ТГ",
  "Полянська ТГ",
  "Мукачівська ТГ",
  "Верхньокоропецька ТГ",
  "Неліпинська ТГ",
  "Великолучківська ТГ",
  "Горондівська ТГ",
  "Жденіївська ТГ",
  "Кольчинська ТГ",
  "Нижньоворітська ТГ",
  "Свалявська ТГ",
  "Чинадіївська ТГ",
  "Воловецька ТГ",
  "Великобичківська ТГ",
  "Рахівська ТГ",
  "Ясінянська ТГ",
  "Богданська ТГ",
  "Усть-Чорнянська ТГ",
  "Углянська ТГ",
  "Вільховецька ТГ",
  "Нересницька ТГ",
  "Бедевлянська ТГ",
  "Тячівська ТГ",
  "Солотвинська ТГ",
  "Буштинська ТГ",
  "Дубівська ТГ",
  "Тересвянська ТГ",
  "Оноківська ТГ",
  "Перечинська ТГ",
  "Турє-Реметівська ТГ",
  "Чопська ТГ",
  "Середнянська ТГ",
  "Сюртівська ТГ",
  "Дубриницько-Малоберезнянська ТГ",
  "Костринська ТГ",
  "Ставненська ТГ",
  "Ужгородська ТГ",
  "Холмківська ТГ",
  "Баранинська ТГ",
  "Великоберезнянська ТГ",
  "Великодобронська ТГ",
  "Колочавська ТГ",
  "Драгівська ТГ",
  "Керецьківська ТГ",
  "Зарічанська ТГ",
  "Синевирська ТГ",
  "Горінчівська ТГ",
  "Міжгірська ТГ",
  "Іршавська ТГ",
  "Білківська ТГ",
  "Вишківська ТГ",
  "Пилипецька ТГ",
  "Хустська ТГ",
  "Довжанська ТГ",
];

// Шляпа
const financialMain = async (req, res) => {
  const final = [];

  try {
    for (let i = 0; i < hromadas_arr.length; i++) {
      const result = await getRowCount(
        `SELECT * FROM budget_dash WHERE nazva_hromady = '${hromadas_arr[i]}'`
      );

      let rating = 0;

      result.forEach((row) => {
        rating +=
          parseFloat(row.fact_dokhodiv_points) +
          parseFloat(row.riven_vykonan_dokhodiv_points) +
          parseFloat(row.temp_rostu_nadkhodzhen_points) +
          parseFloat(row.temp_rostu_mistsevych_podatkiv_nadkhodzhennia_points) +
          parseFloat(row.obsiah_nezabezpechenoi_potreby_points) +
          parseFloat(row.padatkovy_borh_points) +
          parseFloat(row.amount_cashier_points) +
          parseFloat(row.spivvidnoshennia_cash_vydatkiv_points);
      });

      final.push(rating);
    }

    const finalArr = [final, hromadas_arr];

    return res.status(200).json({
      message: "financial main",
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

module.exports = { financialMain };
