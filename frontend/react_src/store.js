var createStore = require("redux").createStore;
var applyMiddleware = require("redux").applyMiddleware;
var compose = require("redux").compose;

var thunk = require("redux-thunk").default;
var promise = require("redux-promise");
var freeze = require("redux-freeze");

var reducers = require("./reducers");

var middlewares = [thunk, promise, freeze];

// Logger should only be in development
if (process.env.NODE_ENV !== "production") {
    var logger = require("redux-logger")({ collapsed: true });
    middlewares.push(logger);
}

function configureStore() {
    var store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

    if (module.onReload) {
        module.onReload(function() {
            var nextReducer = require("./reducers");
            store.replaceReducer(nextReducer.default || nextReducer);

            return true;
        });
    }

    return store;
}

module.exports = configureStore();