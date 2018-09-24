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

class EditLabServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labServiceId: this.props.match.params.id,
            labServicesName: "",
            labServicesNameError: null,
        };

        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async componentDidMount() {
        const {labServiceId} = this.state;
        const {token} = this.props;
        let response = await request.get(`/labservice/${labServiceId}?access_token=${token}`);
        this.setState({
            labServicesName: response.data.name,
        });
    }

    async handleClickSave() {
        const {token} = this.props;
        const {labServiceId, labServicesName} = this.state;

        let params = {
            id: labServiceId,
            name: labServicesName
        };

        try {
            await request.post(`/labservice?access_token=${token}`, params);
            this.props.history.push('/lab-services/list');
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
                                    title="Lab Services"
                                    content={
                                        <div>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Name: <span className="star">*</span>
                                                </ControlLabel>
                                                <FormControl
                                                    type="text"
                                                    name="labServicesName"
                                                    value={this.state.labServicesName}
                                                    onChange={event => {
                                                        this.setState({ labServicesName: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                labServicesNameError: (
                                                                    <small className="text-danger">
                                                                        This field is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ labServicesNameError: null });
                                                    }}
                                                />
                                                {this.state.labServicesNameError}
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

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(EditLabServices);
