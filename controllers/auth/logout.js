const bcrypt = require("bcryptjs");
const { pool } = require("../../models/connection");

const SECRET_KEY = process.env.SECRET;

const logout = async (req, res, next) => {
  const { email, password } = req.body;
  // const user = `SELECT email FROM myusers WHERE email = '${email}'`;
  // console.log("user", user);
  // const validPassword = bcrypt.compareSync(password, user.password);

  // try {
  //   pool.query(user, function (err, result, fields) {
  //     if (err) {
  //       return res.status(404).json({
  //         message: "not found",
  //         code: 404,
  //         data: err,
  //       });
  //     }

  //     if (!user || !user.verify || !validPassword) {
  //       return res.status(401).json({
  //         code: 401,
  //         message: "Email or password is wrong, or email is not verified",
  //       });
  //     }

  //     const payload = {
  //       id: user.id,
  //     };

  //     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  //     // await User.findByIdAndUpdate(user._id, { token });
  //     // const newUserQuery = `UPDATE users SET last_login = now() WHERE id = ?`;

  //     pool.query(
  //       "UPDATE users SET last_login = now() WHERE id = ?",
  //       [user.id],
  //       (err, result) => {
  //         if (err) {
  //           return res.status(404).json({
  //             message: "bad request",
  //             code: 404,
  //           });
  //         }

  //         res.json({
  //           status: "logged in",
  //           code: 200,
  //           data: {
  //             user: {
  //               email,
  //             },
  //             token,
  //           },
  //         });
  //       }
  //     );
  //   });
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
};

module.exports = { logout };
