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

class EditDrugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_text: "",
            type_textError: null,
            multipleSelect: null
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
                                    title="Drugs"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Medicine: <span className="star">*</span>
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
                                                                        Medicine is required.
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

export default EditDrugs;
