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
import { selectOptions, genderOptions } from "variables/Variables.jsx";
import Datetime from "react-datetime";

class EditPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: "",
            patientNameError: null,
            patientGender: null,
            patientBirthday: null,
            multipleSelect: null,
            patientStreetAddress: "",
            patientStreetAddressError: null,
            patientCity: null,
            patientState: null,
            patientPostalCode: "",
            patientPostalCodeError: null
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
                                    title="Patients"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Name: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="patientName"
                                                    onChange={event => {
                                                        this.setState({ patientName: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                patientNameError: (
                                                                    <small className="text-danger">
                                                                        Patient's name is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ patientNameError: null });
                                                    }}
                                                />
                                                {this.state.patientNameError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Gender: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    name="patientGender"
                                                    value={this.state.patientGender}
                                                    options={genderOptions}
                                                    onChange={value =>
                                                        this.setState({ patientGender: value })
                                                    }
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Birthday: <span className="star">*</span>
                                                </ControlLabel>
                                                <Datetime
                                                    timeFormat={false}
                                                    inputProps={{ placeholder: "" }}
                                                    defaultValue={new Date()}
                                                    onChange={value =>
                                                        this.setState({ patientBirthday: value })
                                                    }
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Street Address: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="patientStreetAddress"
                                                    onChange={event => {
                                                        this.setState({ patientStreetAddress: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                patientStreetAddressError: (
                                                                    <small className="text-danger">
                                                                        Street address is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ patientStreetAddressError: null });
                                                    }}
                                                />
                                                {this.state.patientStreetAddressError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    City: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="patientCity"
                                                    value={this.state.patientCity}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ patientCity: value });
                                                    }}
                                                />
                                                {this.state.passwordErrorLogin}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    State: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="patientState"
                                                    value={this.state.patientState}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ patientState: value });
                                                    }}
                                                />
                                                {this.state.passwordErrorLogin}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Postal Code: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    name="patientPostalCode"
                                                    onChange={event => {
                                                        this.setState({
                                                            patientPostalCode: event.target.value
                                                        });
                                                        var digitRex = /^\d+$/;
                                                        digitRex.test(event.target.value) === false
                                                            ? this.setState({
                                                                patientPostalCodeError: (
                                                                    <small className="text-danger">
                                                                        Postal code has to be a number.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ patientPostalCodeError: null });
                                                    }}
                                                />
                                                {this.state.patientPostalCodeError}
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

export default EditPatients;
