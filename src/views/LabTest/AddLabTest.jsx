import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from "react-select";
import Datetime from "react-datetime";
import request from "libs/request";
import {connect} from "react-redux";
import getCurrentDate from "libs/getCurrentDate";


class AddLabTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientOptions: [],
            labServiceOptions: [],
            labTestService: "",
            labTestPatient: "",
            labTestPatientError: null,
            labTestServices: null,
            labTestDatetime: getCurrentDate()
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;

        let patients = await request.get(`/patients?access_token=${token}`);
        let patientOptions = patients.data.map((patient) => {
            return {
                value: {
                    id: patient.id,
                    name: patient.name
                },
                label: patient.name
            }
        });

        let labServices = await request.get(`/labservice?access_token=${token}`);
        let labServiceOptions = labServices.data.map((labService) => {
            return {
                value: {
                    id: labService.id,
                    name: labService.name
                },
                label: labService.name
            }
        });

        this.setState({
            patientOptions: patientOptions,
            labServiceOptions: labServiceOptions,
            loading: false
        });
    }

    async handleClickSave() {
        const {token} = this.props;
        const {labTestService, labTestPatient, labTestDatetime} = this.state;

        let params = {
            service: {
                id: labTestService.value.id
            },
            patient: {
                id: labTestPatient.value.id
            },
            testDate: labTestDatetime,
        };

        try {
            await request.post(`/labtests?access_token=${token}`, params);
            this.props.history.push('/lab-test/list');
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
                                    title="Lab Test Form"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Patient: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    name="labTestPatient"
                                                    value={this.state.labTestPatient}
                                                    options={this.state.patientOptions}
                                                    onChange={value =>
                                                        this.setState({ labTestPatient: value })
                                                    }
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Service: <span className="star">*</span>
                                                </ControlLabel>
                                                <Select
                                                    name="labTestService"
                                                    value={this.state.labTestService}
                                                    options={this.state.labServiceOptions}
                                                    onChange={value =>
                                                        this.setState({ labTestService: value })
                                                    }
                                                />
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

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(AddLabTest);
