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
import { genderOptions } from "variables/Variables.jsx";
import request from "libs/request";
import {connect} from "react-redux";

class AddPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientName: "",
            patientNameError: null,
            patientGender: null,
            patientBirthday: "",
            patientBirthdayError: null,
            patientStreetAddress: "",
            patientStreetAddressError: null,
            patientCity: "",
            patientCityError: null,
            patientState: "",
            patientStateError: null,
            patientPostalCode: "",
            patientPostalCodeError: null
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async handleClickSave() {
        const {token} = this.props;

        let params = {
            "name": this.state.patientName,
            "gender": this.state.patientGender.value,
            "birthday": this.state.patientBirthday,
            "address": {
                "streetAddress": this.state.patientStreetAddress,
                "city": this.state.patientCity,
                "state": this.state.patientState,
                "postalCode": this.state.patientPostalCode
            }
        };

        try {
            await request.post(`/patients?access_token=${token}`, params);
            this.props.history.push('/patients/list');
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
                                                    value={this.state.patientName}
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
                                                <FormControl
                                                    type="text"
                                                    name="patientBirthday"
                                                    value={this.state.patientBirthday}
                                                    onChange={event => {
                                                        this.setState({ patientBirthday: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                patientBirthdayError: (
                                                                    <small className="text-danger">
                                                                        Patient's name is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ patientBirthdayError: null });
                                                    }}
                                                />
                                                {this.state.patientBirthdayError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Street Address: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="patientStreetAddress"
                                                    value={this.state.patientStreetAddress}
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
                                                <FormControl
                                                    type="text"
                                                    name="patientCity"
                                                    value={this.state.patientCity}
                                                    onChange={event => {
                                                        this.setState({ patientCity: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                patientCityError: (
                                                                    <small className="text-danger">
                                                                        Street address is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ patientCityError: null });
                                                    }}
                                                />
                                                {this.state.patientCityError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    State: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="patientState"
                                                    value={this.state.patientState}
                                                    onChange={event => {
                                                        this.setState({ patientState: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                patientStateError: (
                                                                    <small className="text-danger">
                                                                        Street address is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ patientStateError: null });
                                                    }}
                                                />
                                                {this.state.patientStateError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Postal Code: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="number"
                                                    name="patientPostalCode"
                                                    value={this.state.patientPostalCode}
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

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(AddPatients);
