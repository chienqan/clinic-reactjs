import React, {Component} from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import bgImage from "assets/img/full-screen-image-3.jpg";
import request from "libs/request";
import {connect} from "react-redux";
import { saveToken } from "store/actions/token.jsx";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            username: "",
            password: "",
        };

        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({cardHidden: false});
            }.bind(this),
            500
        );
    }

    async handleClickLogin() {
        const {username, password} = this.state;

        let config = {
            method: 'post',
            url: `/oauth/token?grant_type=password&username=${username}&password=${password}`,
            headers: {
                "Authorization": "Basic Y2xpZW50LWlkOnNlY3JldA=="
            }
        };

        try {
            let response = await request(config);
            this.props.saveToken(response.data.access_token);
            this.props.history.push('/diseases/list');
        } catch (e) {
            console.log(e.message);
        }

    }

    render() {
        return (
            <div>
                <div className="wrapper wrapper-full-page">
                    <div
                        className={"full-page login-page"}
                        data-color="black"
                        data-image={bgImage}
                    >
                        <div className="content">
                            <Grid>
                                <Row>
                                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                                        <form>
                                            <Card
                                                hidden={this.state.cardHidden}
                                                textCenter
                                                title="Login"
                                                content={
                                                    <div>
                                                        <FormGroup>
                                                            <ControlLabel>Username</ControlLabel>
                                                            <FormControl
                                                                placeholder="Username"
                                                                type="text"
                                                                onChange={(event) => this.setState({ username: event.target.value })}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <ControlLabel>Password</ControlLabel>
                                                            <FormControl
                                                                placeholder="Password"
                                                                type="password"
                                                                onChange={(event) => this.setState({ password: event.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                }
                                                legend={
                                                    <Button
                                                        bsStyle="info"
                                                        fill
                                                        wd
                                                        onClick={this.handleClickLogin}
                                                    >
                                                        Login
                                                    </Button>
                                                }
                                                ftTextCenter
                                            />
                                        </form>
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                        <div
                            className="full-page-background"
                            style={{backgroundImage: "url(" + bgImage + ")"}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        token: state.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveToken: (token) => dispatch(saveToken(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
