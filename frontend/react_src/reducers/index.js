var combineReducers = require("redux").combineReducers;

// Reducers
var userReducers = require("./user");

// Combine reducers
module.exports = combineReducers({
    userState: userReducers
});