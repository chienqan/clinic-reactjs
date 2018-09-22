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

class EditDiseases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_text: "",
            type_textError: null
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
                                    title="Diseases"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    ICD Code: <span className="star">*</span>
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
                                            <FormGroup>
                                                <ControlLabel>
                                                    Disease: <span className="star">*</span>
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

export default EditDiseases;
