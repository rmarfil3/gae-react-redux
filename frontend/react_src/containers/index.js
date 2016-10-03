var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Grid = require("react-bootstrap").Grid;

var connect =  require("react-redux").connect;

var IndexContainer = React.createClass({
    render: function () {
        return (
            <Grid>
                This is the index page. :)
                &nbsp;<Link to="/x">Go somewhere else</Link>
            </Grid>
        )
    }
});

function mapStateToProps(store) {
    return {}
}

module.exports = connect(mapStateToProps)(IndexContainer);