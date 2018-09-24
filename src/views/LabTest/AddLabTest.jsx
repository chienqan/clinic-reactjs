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

class AddLabTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labTestPatient: "",
            labTestPatientError: null,
            labTestServices: null,
            labTestDatetime: null
        };
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
                                    title="Lab Test Form"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Patient: <span className="star">*</span>
                                                </ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        name="labTestPatient"
                                                        onChange={event => {
                                                            this.setState({ labTestPatient: event.target.value });
                                                            event.target.value === ""
                                                                ? this.setState({
                                                                    labTestPatientError: (
                                                                        <small className="text-danger">
                                                                            This field is required.
                                                                        </small>
                                                                    )
                                                                })
                                                                : this.setState({ labTestPatientError: null });
                                                        }}
                                                    />
                                                    {this.state.labTestPatientError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Services: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    placeholder=""
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="labTestServices"
                                                    value={this.state.labTestServices}
                                                    options={selectOptions}
                                                    onChange={value => {
                                                        this.setState({ labTestServices: value });
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
                                                    inputProps={{ placeholder: "Datetime Picker Here" }}
                                                    defaultValue={new Date()}
                                                    onChange={value => {
                                                        this.setState({ labTestDatetime: value });
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

export default AddLabTest;
