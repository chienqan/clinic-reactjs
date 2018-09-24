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

class AddDiseases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diseaseCode: "",
            diseaseCodeError: null
        };
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    async handleClickSave() {
        const {token} = this.props;

        let params = {
            icd: {
                diseaseCode: this.state.diseaseCode
            }
        };

        try {
            await request.post(`/diseases?access_token=${token}`, params);
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
export default connect(mapStateToProps)(AddDiseases);
