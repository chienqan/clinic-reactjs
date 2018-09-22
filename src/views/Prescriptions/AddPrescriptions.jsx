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
            type_text: "",
            type_textError: null,
            multipleSelect: null,
            singleSelect: null,
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
                                    title="Prescriptions"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Patient: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="type_text"
                                                    onChange={event => {
                                                        this.setState({ type_text: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                type_textError: (
                                                                    <small className="text-danger">
                                                                        Patient's name is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_textError: null });
                                                    }}
                                                />
                                                {this.state.type_textError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Diseases: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="multipleSelect"
                                                    value={this.state.multipleSelect}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ multipleSelect: value });
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
                                                    name="multipleSelect"
                                                    value={this.state.multipleSelect}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ multipleSelect: value });
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
                                                    name="type_number"
                                                    onChange={event => {
                                                        this.setState({
                                                            type_number: event.target.value
                                                        });
                                                        var digitRex = /^\d+$/;
                                                        digitRex.test(event.target.value) === false
                                                            ? this.setState({
                                                                type_numberError: (
                                                                    <small className="text-danger">
                                                                        This has to be a number.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_numberError: null });
                                                    }}
                                                />
                                                {this.state.type_numberError}
                                            </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Dose: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    name="singleSelect"
                                                    value={this.state.singleSelect}
                                                    options={doseOptions}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
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
                                                    name="type_text"
                                                    onChange={event => {
                                                        this.setState({ type_text: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                type_textError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_textError: null });
                                                    }}
                                                />
                                                {this.state.type_textError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Datetime: <span className="star">*</span>
                                                </ControlLabel>
                                                <Datetime
                                                    inputProps={{ placeholder: "Datetime Picker Here" }}
                                                    defaultValue={new Date()}
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

export default AddPrescriptions;
