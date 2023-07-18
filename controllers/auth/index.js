const { getAllUsers } = require("./getAllUsers");
const { getCurrentUser } = require("./getCurrentUser");
const { login } = require("./login");
const { logout } = require("./logout");
const { signup } = require("./signup");

module.exports = { getAllUsers, getCurrentUser, login, logout, signup };
