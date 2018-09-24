import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Datetime from "react-datetime";
import {connect} from "react-redux";
import request from "libs/request";
import getCurrentDateTime from "libs/getCurrentDateTime";

class AddVisits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitPrescriptionId: 0,
            visitPrescriptionIdError: null,
            visitPatientId: 0,
            visitPatientIdError: null,
            visitProblems: "",
            visitProblemsError: null,
            visitDiseases: null,
            visitDatetime: getCurrentDateTime()
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async handleClickSave() {
        const {token} = this.props;
        let datetime = this.state.visitDatetime.split(" ");
        let problems = this.state.visitProblems.split(",").map(problem => problem.trim());

        let params = {
            date: datetime[0],
            time: datetime[1] + ' ' + datetime[2],
            problems: problems,
            prescription: {
                id: this.state.visitPrescriptionId
            },
            patient: {
                id: this.state.visitPatientId
            }
        };

        try {
            await request.post(`/visits?access_token=${token}`, params);
            this.props.history.push('/visits/list');
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <form>
                                <Card
                                    title="Visits"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Prescription ID: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    name="visitPrescriptionId"
                                                    onChange={event => {
                                                        this.setState({
                                                            visitPrescriptionId: event.target.value
                                                        });
                                                        var digitRex = /^\d+$/;
                                                        digitRex.test(event.target.value) === false
                                                            ? this.setState({
                                                                visitPrescriptionIdError: (
                                                                    <small className="text-danger">
                                                                        This has to be a number.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ visitPrescriptionIdError: null });
                                                    }}
                                                />
                                                {this.state.visitPrescriptionIdError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Patient ID: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    name="visitPatientId"
                                                    onChange={event => {
                                                        this.setState({ visitPatientId: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                visitPatientIdError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ visitPatientIdError: null });
                                                    }}
                                                />
                                                {this.state.visitPatientIdError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Problems: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="visitProblems"
                                                    placeholder="headache, stomach, fever, diarrhea, stomachache"
                                                    onChange={event => {
                                                        this.setState({ visitProblems: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                visitProblemsError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ visitProblemsError: null });
                                                    }}
                                                />
                                                {this.state.visitProblemsError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Datetime: <span className="star">*</span>
                                                </ControlLabel>
                                                <Datetime
                                                    inputProps={{ placeholder: "" }}
                                                    defaultValue={new Date()}
                                                    onChange={value => {
                                                        this.setState({ visitDatetime: value });
                                                    }}
                                                />
                                            </FormGroup>
                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button
                                            bsStyle="info"
                                            fill
                                            wd
                                            onClick={this.handleClickSave.bind(this)}
                                        >
                                            Save
                                        </Button>
                                    }
                                />
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(AddVisits);
