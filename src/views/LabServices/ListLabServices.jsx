import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import request from "libs/request";
import attachToken from "libs/attachToken";
import _ from "lodash";

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
        let response = await request.get(attachToken('/labServices'));
        this.setState({
            labServices: response.data,
            loading: false
        });
    }

    handleClickAdd() {
        this.props.history.push('/labServices/add')
    };

    handleClickEdit(id) {
        this.props.history.push(`/labServices/edit/${id}`)
    };

    async handleClickRemove(key, id) {
        try {
            const {labServices} = this.state;
            await request.delete(attachToken(`/labServices/${id}`));
            labServices.splice(key, 1);
            this.setState({ drugs: labServices });
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
            console.log(prop.service.name)
            return {
                id: key,
                name: prop.service.name,
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

export default ListLabServices;
