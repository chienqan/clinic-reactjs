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
import { selectOptions, doseOptions } from "variables/Variables.jsx";
import Datetime from "react-datetime";

class AddPrescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptionsPatient: "",
            prescriptionsPatientError: null,
            prescriptionsDiseases: null,
            prescriptionsDrugs: null,
            prescriptionsQuantity: "",
            prescriptionsQuantityError: null,
            prescriptionsDose: null,
            prescriptionsUse: "",
            prescriptionsUseError: null,
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    handleClickSave() {

    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <form>
                                <Card
                                    title="Prescriptions"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Patient: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="prescriptionsPatient"
                                                    onChange={event => {
                                                        this.setState({ prescriptionsPatient: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                prescriptionsPatientError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ prescriptionsPatientError: null });
                                                    }}
                                                />
                                                {this.state.prescriptionsPatientError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Diseases: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="prescriptionsDiseases"
                                                    value={this.state.prescriptionsDiseases}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ prescriptionsDiseases: value });
                                                    }}
                                                />
                                            </FormGroup>
                                            <Row>
                                            <Col md={4}>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Drugs: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="prescriptionsDrugs"
                                                    value={this.state.prescriptionsDrugs}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ prescriptionsDrugs: value });
                                                    }}
                                                />
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Quantity: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    name="prescriptionsQuantity"
                                                    onChange={event => {
                                                        this.setState({
                                                            prescriptionsQuantity: event.target.value
                                                        });
                                                        var digitRex = /^\d+$/;
                                                        digitRex.test(event.target.value) === false
                                                            ? this.setState({
                                                                prescriptionsQuantityError: (
                                                                    <small className="text-danger">
                                                                        This has to be a number.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ prescriptionsQuantityError: null });
                                                    }}
                                                />
                                                {this.state.prescriptionsQuantityError}
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Dose: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    name="prescriptionsDose"
                                                    value={this.state.prescriptionsDose}
                                                    options={doseOptions}
                                                    onChange={value =>
                                                        this.setState({ prescriptionsDose: value })
                                                    }
                                                />
                                            </FormGroup>
                                            </Col>
                                            </Row>
                                            <FormGroup>
                                                <ControlLabel>
                                                    How to use: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="prescriptionsUse"
                                                    onChange={event => {
                                                        this.setState({ prescriptionsUse: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                PrescriptionsUseError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ prescriptionsUseError: null });
                                                    }}
                                                />
                                                {this.state.prescriptionsUseError}
                                            </FormGroup>
                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button
                                            bsStyle="info"
                                            fill
                                            wd
                                            onClick={this.handleClickSave}
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

export default AddPrescriptions;
