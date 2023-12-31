const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    structureName: Joi.string().valid("oda", "district", "hromada").required(),
    phone: Joi.string().min(3).max(30).required(),
    position: Joi.string().valid("user", "deputy", "admin").required(),
    access: Joi.string().valid("oda", "district", "hromada").required(),
    district: Joi.string().valid(
      "Ужгородський",
      "Мукачівський",
      "Берегівський",
      "Хустський",
      "Тячівський",
      "Рахівський",
      null
    ),
    hromada: Joi.string().valid(
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
      null
    ),
    phone: Joi.string().min(3).max(30).required(),
  });

  // surname: Joi.string().min(3).max(30).required(),
  // firstName: Joi.string().min(3).max(30).required(),
  // lastName: Joi.string().min(3).max(30).required(),

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    login: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(3).max(12).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
