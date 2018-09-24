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
import request from "libs/request";
import {connect} from "react-redux";

class AddDrugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicineName: "",
            medicineNameError: null,
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async handleClickSave() {
        const {token} = this.props;

        let params = {
            medicine: {
                name: this.state.medicineName
            }
        };

        try {
            await request.post(`/drugs?access_token=${token}`, params);
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
                                    title="Drugs"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Medicine: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="medicineName"
                                                    onChange={event => {
                                                        this.setState({ medicineName: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                medicineNameError: (
                                                                    <small className="text-danger">
                                                                        Medicine is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ medicineNameError: null });
                                                    }}
                                                />
                                                {this.state.medicineNameError}
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
export default connect(mapStateToProps)(AddDrugs);
