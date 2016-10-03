var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var NotFoundContainer = React.createClass({
    render: function () {
        return (
            <div>
                We can't find the page you are looking for. :(
            </div>
        )
    }
});

module.exports = NotFoundContainer;