var Schema = require("normalizr").Schema;
var arrayOf = require("normalizr").arrayOf;

var user = new Schema("users");
var users = arrayOf(user);

module.exports = {
    user: user,
    users: users
};