var Axios = require("axios");
var store = require("../store");

var normalize = require("normalizr").normalize;
var schemas = require("./schemas");

var actions = require("../actions/user");
var config = require("../constants/config");

Axios.defaults.baseURL = config.API_ROOT_URL;

exports.getUsers = function (onSuccess, onFail) {
    return Axios.get("/users")
        .then(function (response) {
            store.dispatch(actions.getUsersSuccess(normalize(response.data.users, schemas.users)));
            onSuccess && onSuccess();
        })
        .catch(function (error) {
            console.log("Axios Error: ", error);
            onFail && onFail((error.response && error.response.data) || error.message);
        });
};