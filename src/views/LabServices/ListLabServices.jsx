import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import request from "libs/request";
import _ from "lodash";
import {connect} from "react-redux";

class ListLabServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labServices: [],
            loading: true
        };

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;

        let response = await request.get(`/labservice?access_token=${token}`);
        this.setState({
            labServices: response.data,
            loading: false
        });
    }

    handleClickAdd() {
        this.props.history.push('/lab-services/add')
    };

    handleClickEdit(id) {
        this.props.history.push(`/lab-services/edit/${id}`)
    };

    async handleClickRemove(key, id) {
        const {token} = this.props;
        const {labServices} = this.state;

        try {
            await request.delete(`/labservice/${id}?access_token=${token}`);
            labServices.splice(key, 1);
            this.setState({ labServices: labServices });
        } catch (e) {
            console.log(e.message);
        }
    }

    renderCell() {
        const {labServices} = this.state;

        if(_.isEmpty(labServices)) {
            return [];
        }

        return labServices.map((prop, key) => {
            return {
                id: key,
                name: prop.name,
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
                                title="Lab Services"
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
                                                Header: "Service",
                                                accessor: "name",
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
export default connect(mapStateToProps)(ListLabServices);
