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
            type_text: "",
            type_textError: null,
            multipleSelect: null,
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
