// middleware/users.js
const jwt = require("jsonwebtoken");

const validateRegister = (req, res, next) => {
  // username min length 3
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).json({
      message: "Please enter a username with min. 3 chars",
    });
  }
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).json({
      message: "Please enter a password with min. 6 chars",
    });
  }

  next();
};

module.exports = { validateRegister };

// const Joi = require("joi");

// const addSignupValidation = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     password: Joi.string().min(3).max(30).required(),
//     email: Joi.string()
//       .email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com", "net"] },
//       })
//       .required(),
//   });

//   const validationResult = schema.validate(req.body);

//   if (validationResult.error) {
//     return res.status(400).json({
//       message: validationResult.error.details,
//       code: 400,
//     });
//   }

//   next();
// };

// const addLoginValidation = (req, res, next) => {
//   const schema = Joi.object({
//     password: Joi.string().min(3).max(30).required(),
//     email: Joi.string()
//       .email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com", "net"] },
//       })
//       .required(),
//   });

//   const validationResult = schema.validate(req.body);

//   if (validationResult.error) {
//     return res.status(400).json({
//       message: validationResult.error.details,
//       code: 400,
//     });
//   }

//   next();
// };

// const addEmailValidation = (req, res, next) => {
//   const schema = Joi.object({
//     email: Joi.string()
//       .email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com", "net"] },
//       })
//       .required(),
//   });

//   const validationResult = schema.validate(req.body);

//   if (validationResult.error) {
//     return res.status(400).json({
//       message: validationResult.error.details,
//       code: 400,
//     });
//   }

//   next();
// };

// module.exports = {
//   addSignupValidation,
//   addLoginValidation,
//   addEmailValidation,
// };
