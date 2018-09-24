import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {connect} from "react-redux";
import request from "libs/request";
import _ from "lodash";

class ListPrescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prescriptions: [],
            loading: true
        };
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;
        let response = await request.get(`/prescriptions?access_token=${token}`);
        this.setState({
            prescriptions: response.data,
            loading: false
        });
    }

    handleClickAdd() {
        this.props.history.push('/prescriptions/add');
    }

    handleClickEdit(id) {
        this.props.history.push(`/prescriptions/edit/${id}`);
    }

    async handleClickRemove(key, id) {
        const {token} = this.props;
        const {prescriptions} = this.state;

        try {
            await request.delete(`/prescriptions/${id}?access_token=${token}`);
            prescriptions.splice(key, 1);
            this.setState({ prescriptions: prescriptions });
        } catch (e) {
            console.log(e.message);
        }
    }

    renderAction() {
        const {prescriptions} = this.state;

        if(_.isEmpty(prescriptions)) {
            return [];
        }


        return prescriptions.map((prop, key) => {
            return {
                id: key,
                quantity: prop.quantity,
                dose: prop.dose,
                howtouse: prop.howToUse,
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
                                title="Prescriptions"
                                bigIcon={this.renderIconPlus()}
                                content={
                                    <ReactTable
                                        loading={this.state.loading}
                                        data={this.renderAction()}
                                        columns={[
                                            {
                                                Header: "Id",
                                                accessor: "id",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Quantity",
                                                accessor: "quantity",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Dose",
                                                accessor: "dose",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "How to use",
                                                accessor: "howtouse",
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
export default connect(mapStateToProps)(ListPrescriptions);
