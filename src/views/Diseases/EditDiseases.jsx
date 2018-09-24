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
import attachToken from "libs/attachToken";

class EditDiseases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diseaseId: this.props.match.params.id,
            diseaseCode: "",
            diseaseCodeError: null,
            prescriptionId: "",
            prescriptionIdError: null
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async componentDidMount() {
        const {diseaseId} = this.state;
        let response = await request.get(attachToken(`/diseases/${diseaseId}`));
        let icd = response.data.icd;
        this.setState({
            diseaseCode: icd.diseaseCode,
            prescriptionId: icd.prescriptionId ? icd.prescriptionId : 1
        });
    }

    async handleClickSave() {
        const {diseaseId, diseaseCode, prescriptionId} = this.state;
        let params = {
            id: diseaseId,
            icd: {
                diseaseCode: diseaseCode
            },
            prescription: {
                id: prescriptionId
            }
        };

        try {
            await request.put(attachToken('/diseases'), params);
            this.props.history.push('/diseases/list');
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
                                    title="Diseases"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    ICD Code: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="diseaseCode"
                                                    value={this.state.diseaseCode}
                                                    onChange={event => {
                                                        this.setState({ diseaseCode: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                diseaseCodeError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ diseaseCodeError: null });
                                                    }}
                                                />
                                                {this.state.diseaseCodeError}
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Prescription Id:
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="prescriptionId"
                                                    value={this.state.prescriptionId}
                                                    onChange={event => {
                                                        this.setState({ prescriptionId: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                prescriptionIdError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ prescriptionIdError: null });
                                                    }}
                                                />
                                                {this.state.prescriptionIdError}
                                            </FormGroup>
                                        </div>
                                    }
                                    ftTextCenter
                                    legend={
                                        <Button
                                            bsStyle="info"
                                            fill
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

export default EditDiseases;
