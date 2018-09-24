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
        const {token} = this.props;
        let response = await request.get(`/diseases/${diseaseId}?access_token=${token}`);
        this.setState({
            diseaseCode: response.data.icd.diseaseCode,
            prescriptionId: response.data.icd.prescriptionId ? response.data.icd.prescriptionId : 1
        });
    }

    async handleClickSave() {
        const {diseaseId, diseaseCode, prescriptionId} = this.state;
        const {token} = this.props;

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
            await request.put(`/diseases?access_token=${token}`, params);
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
export default connect(mapStateToProps)(EditDiseases);
