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

class EditDrugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugId: this.props.match.params.id,
            medicineName: "",
            medicineNameError: null,
            prescriptionId: "",
            prescriptionIdError: null
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async componentDidMount() {
        const {drugId} = this.state;
        const {token} = this.props;
        let response = await request.get(`/drugs/${drugId}?access_token=${token}`);
        this.setState({
            medicineName: response.data.medicine.name,
            prescriptionId: response.data.prescriptionId ? response.data.prescriptionId : 1
        });
    }

    async handleClickSave() {
        const {drugId, medicineName, prescriptionId} = this.state;
        const {token} = this.props;

        let params = {
            id: drugId,
            medicine: {
                name: medicineName
            },
            prescription: {
                id: prescriptionId
            }
        };

        try {
            await request.put(`/drugs?access_token=${token}`, params);
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
                                                    Medicine Name: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="medicineName"
                                                    value={this.state.medicineName}
                                                    onChange={event => {
                                                        this.setState({ medicineName: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                medicineNameError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
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
export default connect(mapStateToProps)(EditDrugs);
