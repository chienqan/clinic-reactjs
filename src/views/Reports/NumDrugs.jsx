import React, { Component } from "react";
import { Table, Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import { thArrayDrugReports, tdArrayDrugReports } from "variables/Variables.jsx";

class NumDrugs extends Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Number of drugs per day"
                                tableFullWidth
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                        <tr>
                                            {thArrayDrugReports.map((prop, key) => {
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tdArrayDrugReports.map((prop, key) => {
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

export default NumDrugs;
