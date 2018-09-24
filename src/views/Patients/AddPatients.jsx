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
import request from "libs/request";
import attachToken from "libs/attachToken";

class AddPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_text: "",
            type_textError: null,
            multipleSelect: null,
            singleSelect: null,
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async handleClickSave() {
        let params = {
            medicine: {
                name: this.state.type_text
            }
        };

        try {
            await request.post(attachToken('/drugs'), params);
            this.props.history.push('/drugs/list');
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
                                                    Gender: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    name="singleSelect"
                                                    value={this.state.singleSelect}
                                                    options={genderOptions}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
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
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Street Address: <span className="star">*</span>
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
                                                                        Street address is required.
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
                                                    City: <span className="star">*</span>
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
                                                    name="multipleSelect"
                                                    value={this.state.multipleSelect}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ multipleSelect: value });
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
                                                                        Postal code has to be a number.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_numberError: null });
                                                    }}
                                                />
                                                {this.state.type_numberError}
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

export default AddPatients;
