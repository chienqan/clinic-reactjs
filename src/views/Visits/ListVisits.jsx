import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import request from "libs/request";
import access_token from "variables/accessTokenVariables";
import _ from "lodash";

class ListVisits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visits: []
        };
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
    }

    async componentDidMount() {
        let response = await request.get(`/visits?access_token=${access_token}`);
        this.setState({
            visits: response.data
        });
    }

    handleClickAdd() {
        this.props.history.push('/visits/add')
    };

    handleClickEdit() {
        this.props.history.push('/visits/edit/')
    };

    renderCell() {
        const {visits} = this.state;

        if(_.isEmpty(visits)) {
            return [];
        }

        return visits.map((prop, key) => {
            return {
                id: key,
                datetime: prop.date + ' ' + prop.time,
                patient: prop.patient.name,
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a edit kind of action */}
                        <Button
                            onClick={this.handleClickEdit}
                            bsStyle="warning"
                            simple
                            icon

                        >
                            <i className="fa fa-edit" />
                        </Button>{" "}
                        {/* use this button to remove the data row */}
                        <Button
                            onClick={() => console.log("TRUE")}
                            bsStyle="danger"
                            simple
                            icon
                        >
                            <i className="fa fa-times" />
                        </Button>{" "}
                    </div>
                )
            };
        })
    }

    renderIconPlus() {
        return <i className="fa fa-plus text-info" onClick={this.handleClickAdd} style={{cursor: 'pointer'}}/>;
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Visits"
                                bigIcon={this.renderIconPlus()}
                                content={
                                    <ReactTable
                                        data={this.renderCell()}
                                        columns={[
                                            {
                                                Header: "Id",
                                                accessor: "id",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Datetime",
                                                accessor: "datetime",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Patient",
                                                accessor: "patient",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "actions",
                                                sortable: false,
                                                filterable: false
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        showPaginationTop={false}
                                        showPaginationBottom
                                        className="-striped -highlight"
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ListVisits;
