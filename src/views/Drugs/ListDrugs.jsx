import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import request from "libs/request";
import {connect} from "react-redux";
import _ from "lodash";

class ListDrugs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs: [],
            loading: true
        };

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;
        let response = await request.get(`/drugs?access_token=${token}`);
        this.setState({
            drugs: response.data,
            loading: false
        });
    }

    handleClickAdd() {
        this.props.history.push('/drugs/add')
    };

    handleClickEdit(id) {
        this.props.history.push(`/drugs/edit/${id}`)
    };

    async handleClickRemove(key, id) {
        const {token} = this.props;
        const {drugs} = this.state;

        try {
            await request.delete(`/drugs/${id}?access_token=${token}`);
            drugs.splice(key, 1);
            this.setState({ drugs: drugs });
        } catch (e) {
            console.log(e.message);
        }
    }

    renderCell() {
        const {drugs} = this.state;

        if(_.isEmpty(drugs)) {
            return [];
        }

        return drugs.map((prop, key) => {
            console.log(prop.medicine.name);
            return {
                id: key,
                name: prop.medicine.name,
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
                                title="Drugs"
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
                                                Header: "Medicine",
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
export default connect(mapStateToProps)(ListDrugs);
