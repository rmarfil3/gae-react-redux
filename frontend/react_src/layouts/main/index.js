var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var Header = require("../../components/header");

var styles = require("./styles.css");

var MainLayout = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired
    },

    render: function () {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
});

module.exports = MainLayout;