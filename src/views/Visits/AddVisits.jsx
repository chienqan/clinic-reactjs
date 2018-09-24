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
import Select from "react-select";
import { selectOptions } from "variables/Variables.jsx";
import Datetime from "react-datetime";

class AddVisits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitPrescriptionId: "",
            visitPrescriptionIdError: null,
            visitPatient: "",
            visitPatientError: null,
            visitDiseases: null,
            visitDatetime: null
        };
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
                                                    Patient: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="visitPatient"
                                                    onChange={event => {
                                                        this.setState({ visitPatient: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                visitPatientError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ visitPatientError: null });
                                                    }}
                                                />
                                                {this.state.visitPatientError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Diseases: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="visitDiseases"
                                                    value={this.state.visitDiseases}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ visitDiseases: value });
                                                    }}
                                                />
                                                {this.state.passwordErrorLogin}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Datetime: <span className="star">*</span>
                                                </ControlLabel>
                                                <Datetime
                                                    timeFormat={false}
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
                                            // wd
                                            // onClick={this.handleLoginSubmit.bind(this)}
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

export default AddVisits;
