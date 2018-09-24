import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from "react-notification-system";

import Sidebar from "components/Sidebar/Sidebar.jsx";
import Header from "components/Header/Header.jsx";

// dinamically create dashboard routes
import dashboardRoutes from "routes/dashboard.jsx";

// style for notifications
import {style} from "variables/Variables.jsx";
import {connect} from "react-redux";
import _ from "lodash";

var ps;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }

    componentWillMount() {
        if(_.isEmpty(this.props.token)) {
            this.props.history.push('/login');
        }

        if (document.documentElement.className.indexOf("nav-open") !== -1) {
            document.documentElement.classList.toggle("nav-open");
        }
    }

    componentDidMount() {
        this.setState({_notificationSystem: this.refs.notificationSystem});
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel);
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }

    componentDidUpdate(e) {
        if (navigator.platform.indexOf("Win") > -1) {
            setTimeout(() => {
                ps.update();
            }, 350);
        }
        if (e.history.action === "PUSH") {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
        if (
            window.innerWidth < 993 &&
            e.history.action === "PUSH" &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
        }
    }

    // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
    handleNotificationClick(position) {
        var color = Math.floor(Math.random() * 4 + 1);
        var level;
        switch (color) {
            case 1:
                level = "success";
                break;
            case 2:
                level = "warning";
                break;
            case 3:
                level = "error";
                break;
            case 4:
                level = "info";
                break;
            default:
                break;
        }
        this.state._notificationSystem.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift"/>,
            message: (
                <div>
                    Welcome to <b>Clinic Dashboard</b>.
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15
        });
    }

    render() {
        return (
            <div className="wrapper">
                <NotificationSystem ref="notificationSystem" style={style}/>
                <Sidebar {...this.props} />
                <div
                    className={
                        "main-panel" +
                        (this.props.location.pathname === "/maps/full-screen-maps"
                            ? " main-panel-maps"
                            : "")
                    }
                    ref="mainPanel"
                >
                    <Header {...this.props} />
                    <Switch>
                        {dashboardRoutes.map((prop, key) => {
                            if (prop.collapse) {
                                return prop.views.map((prop, key) => {
                                    if (prop.name === "Notifications") {
                                        return (
                                            <Route
                                                path={prop.path}
                                                key={key}
                                                render={routeProps => (
                                                    <prop.component
                                                        {...routeProps}
                                                        handleClick={this.handleNotificationClick}
                                                    />
                                                )}
                                            />
                                        );
                                    } else {
                                        return (
                                            <Route
                                                path={prop.path}
                                                component={prop.component}
                                                key={key}
                                            />
                                        );
                                    }
                                });
                            } else {
                                if (prop.redirect)
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                                    );
                                else
                                    return (
                                        <Route
                                            path={prop.path}
                                            component={prop.component}
                                            key={key}
                                        />
                                    );
                            }
                        })}
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(Dashboard);
