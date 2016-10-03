var React = require("react");
var Link = require("react-router").Link;
var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;

var styles = require("./styles.css");

var Header = React.createClass({
    propTypes: {},

    render: function () {
        return (
            <Navbar inverse fixedTop fluid className={styles.navbar}>
                <Navbar.Header>
                    <Navbar.Brand className={styles.brand}>
                        <Link to="/" className={styles["brand-text"]}>
                            {/*<img className={styles.logo} src="/img/logo.png" />*/}
                            My App
                        </Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {/* Links here */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
});

module.exports = Header;
