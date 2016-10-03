exports.TYPE_GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

exports.getUsersSuccess = function (data) {
    return {
        type: this.TYPE_GET_USERS_SUCCESS,
        data: data
    }
};