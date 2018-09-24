import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {connect} from "react-redux";
import request from "libs/request";
import _ from "lodash";

class ListLabTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labTests: [],
        };
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;

        let response = await request.get(`/labtests?access_token=${token}`);
        this.setState({
            labTests: response.data,
            loading: false
        });
    }


    handleClickAdd() {
        this.props.history.push('/lab-test/add')
    };

    handleClickEdit(id) {
        this.props.history.push(`/lab-test/edit/${id}`)
    };

    async handleClickRemove(key, id) {
        const {token} = this.props;
        const {labTests} = this.state;

        try {
            await request.delete(`/labtests/${id}?access_token=${token}`);
            labTests.splice(key, 1);
            this.setState({ labTests: labTests });
        } catch (e) {
            console.log(e.message);
        }
    }

    renderAction() {
        const {labTests} = this.state;

        if(_.isEmpty(labTests)) {
            return [];
        }

        return labTests.map((prop, key) => {
            return {
                id: key,
                patients: prop.patient.name,
                services: prop.service.name,
                datetime: prop.testDate,
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                        {/* use this button to add a edit kind of action */}
                        <Button
                            onClick={() => this.handleClickEdit(prop.id)}
                            bsStyle="warning"
                            simple
                            icon

                        >
                            <i className="fa fa-edit" />
                        </Button>{" "}
                        {/* use this button to remove the data row */}
                        <Button
                            onClick={() => this.handleClickRemove(key, prop.id)}
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
                                title="Lab Test"
                                bigIcon={this.renderIconPlus()}
                                content={
                                    <ReactTable
                                        data={this.renderAction()}
                                        //filterable
                                        columns={[
                                            {
                                                Header: "Id",
                                                accessor: "id",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Patients",
                                                accessor: "patients",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Services",
                                                accessor: "services",
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

const mapStateToProps = (state) => ({token: state.token});
export default connect(mapStateToProps)(ListLabTest);
