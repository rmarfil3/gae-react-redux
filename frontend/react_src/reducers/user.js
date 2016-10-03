var combineReducers = require("redux").combineReducers;
var _ = require("lodash");

var user = require("../actions/user");

var userReducer = combineReducers({
    ids: ids,
    users: byId
});

function byId(state = {}, action) {
    switch (action.type) {
        case user.TYPE_GET_USERS_SUCCESS:
            return {
                ...state,
                ...action.data.entities.users
            };
    }

    return state;
}

function ids(state = [], action) {
    switch (action.type) {
        case user.TYPE_GET_USERS_SUCCESS:
            return [...state, ...action.data.result];
    }

    return state;
}

module.exports = userReducer;