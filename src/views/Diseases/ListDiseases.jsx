import React, {Component} from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import {Grid, Row, Col} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import request from "libs/request";
import _ from "lodash";
import {connect} from "react-redux";


class ListDiseases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diseases: [],
            loading: true
        };

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    async componentDidMount() {
        const {token} = this.props;
        let response = await request.get(`/diseases?access_token=${token}`);
        this.setState({
            diseases: response.data,
            loading: false
        });
    }

    handleClickAdd() {
        this.props.history.push('/diseases/add')
    }

    handleClickEdit(id) {
        this.props.history.push(`/diseases/edit/${id}`);
    }

    async handleClickRemove(key, id) {
        const {token} = this.props;
        const {diseases} = this.state;

        try {
            await request.delete(`/diseases/${id}?access_token=${token}`);
            diseases.splice(key, 1);
            this.setState({ diseases: diseases });
        } catch (e) {
            console.log(e.message);
        }
    }

    renderCell() {
        const {diseases} = this.state;

        if(_.isEmpty(diseases)) {
            return [];
        }

        return diseases.map((prop, key) => {
            return {
                id: key,
                icdcode: prop.icd.diseaseCode,
                diseases: prop.icd.diseaseName,
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
                            <i className="fa fa-edit"/>
                        </Button>{" "}
                        {/* use this button to remove the data row */}
                        <Button
                            onClick={() => this.handleClickRemove(key, prop.id)}
                            bsStyle="danger"
                            simple
                            icon
                        >
                            <i className="fa fa-times"/>
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
                                title="Diseases"
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
                                                Header: "ICD Code",
                                                accessor: "icdcode",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "Diseases",
                                                accessor: "diseases",
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
export default connect(mapStateToProps)(ListDiseases);
