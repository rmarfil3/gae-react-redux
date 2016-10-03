var React = require("react");
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;

var MainLayout = require("./layouts/main");
var IndexContainer = require("./containers/index");
var NotFoundContainer = require("./containers/not-found");

module.exports = React.createClass({
    render: function () {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={MainLayout}>
                    <IndexRoute component={IndexContainer} />
                    <Route path="*" component={NotFoundContainer} />
                </Route>
            </Router>
        )
    }
});