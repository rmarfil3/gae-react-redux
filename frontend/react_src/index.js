// Required for ES6 features not available in ES2015 preset
require("babel-polyfill");

var React = require("react");
var ReactDOM = require("react-dom");
var Provider = require("react-redux").Provider;

var Routes = require("./routes");
var Store = require("./store");

var MOUNT_NODE = document.getElementById("content");

ReactDOM.render(
    <Provider store={Store}>
        <Routes/>
    </Provider>,
    MOUNT_NODE
);