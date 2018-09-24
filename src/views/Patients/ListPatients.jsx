import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import request from "libs/request";
import _ from "lodash";
import {connect} from "react-redux";

class ListPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            loading: true
        };

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;

        let response = await request.get(`/patients?access_token=${token}`);
        this.setState({
            patients: response.data,
            loading: false
        });
    }

    handleClickAdd() {
        this.props.history.push('/patients/add');
    };

    handleClickEdit(id) {
        this.props.history.push(`/patients/edit/${id}`);
    };

    async handleClickRemove(key, id) {
        const {patients} = this.state;
        const {token} = this.props;

        try {
            await request.delete(`/patients/${id}?access_token=${token}`);
            patients.splice(key, 1);
            this.setState({ patients: patients });
        } catch (e) {
            console.log(e.message);
        }
    }

    renderCell() {
        const {patients} = this.state;

        if(_.isEmpty(patients)) {
            return [];
        }

        return patients.map((prop, key) => {
            return {
                id: key,
                name: prop.name,
                gender: prop.gender,
                birthday: prop.birthday,
                streetaddress: prop.address.streetAddress,
                city: prop.address.city,
                state: prop.address.state,
                postalcode: prop.address.postalCode,
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
                                title="Patients"
                                bigIcon={this.renderIconPlus()}
                                content={
                                    <ReactTable
                                        data={this.renderCell()}
                                        loading={this.state.loading}
                                        columns={[
                                            {
                                                Header: "Id",
                                                accessor: "id",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Gender",
                                                accessor: "gender",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Birthday",
                                                accessor: "birthday",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Street Address",
                                                accessor: "streetaddress",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "City",
                                                accessor: "city",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "State",
                                                accessor: "state",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Postal Code",
                                                accessor: "postalcode",
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
export default connect(mapStateToProps)(ListPatients);
