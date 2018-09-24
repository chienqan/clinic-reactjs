import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import request from "libs/request";
import _ from "lodash";
import {connect} from "react-redux";

class NumPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
        };
    }

    async componentDidMount() {
        const {token} = this.props;
        let response = await request.get(`/reports/number-of-patient-visit-per-day?access_token=${token}`);
        this.setState({
            reports: response.data
        });
    }

    renderCell() {
        const {reports} = this.state;

        if(_.isEmpty(reports)) {
            return [];
        }

        return reports.map((prop, key) => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{prop.date}</td>
                    <td>{prop.numberOfPatient}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Number of patients per day"
                                tableFullWidth
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Date</th>
                                                <th>Number Of Patients</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderCell()}
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(NumPatients);
