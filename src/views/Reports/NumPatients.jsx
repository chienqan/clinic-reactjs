import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import { thArrayPatientReports, tdArrayPatientReports } from "variables/Variables.jsx";

class NumPatients extends Component {
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
                                            {thArrayPatientReports.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tdArrayPatientReports.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    {prop.map((prop, key) => {
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
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

export default NumPatients;
