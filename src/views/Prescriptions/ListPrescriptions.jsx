import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

const dataTable = [
    ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
    ["Garrett Winters", "Accountant", "Tokyo", "63"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
    ["Airi Satou", "Accountant", "Tokyo", "33"],
    ["Brielle Williamson", "Integration Specialist", "New York", "61"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
    ["Jena Gaines", "Office Manager", "London", "30"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
    ["Charde Marshall", "Regional Director", "San Francisco", "36"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
    ["Tatyana Fitzpatrick", "Regional Director", "London", "19"],
    ["Michael Silva", "Marketing Designer", "London", "66"],
    ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "64"],
    ["Gloria Little", "Systems Administrator", "New York", "59"],
    ["Bradley Greer", "Software Engineer", "London", "41"],
    ["Dai Rios", "Personnel Lead", "Edinburgh", "35"],
    ["Jenette Caldwell", "Development Lead", "New York", "30"],
    ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "40"],
    ["Caesar Vance", "Pre-Sales Support", "New York", "21"],
    ["Doris Wilder", "Sales Assistant", "Sidney", "23"],
    ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "47"],
    ["Gavin Joyce", "Developer", "Edinburgh", "42"],
    ["Jennifer Chang", "Regional Director", "Singapore", "28"],
    ["Brenden Wagner", "Software Engineer", "San Francisco", "28"],
    ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "48"],
    ["Shou Itou", "Regional Marketing", "Tokyo", "20"],
    ["Michelle House", "Integration Specialist", "Sidney", "37"],
    ["Suki Burks", "Developer", "London", "53"],
    ["Prescott Bartlett", "Technical Author", "London", "27"],
    ["Gavin Cortez", "Team Leader", "San Francisco", "22"],
    ["Martena Mccray", "Post-Sales support", "Edinburgh", "46"],
    ["Unity Butler", "Marketing Designer", "San Francisco", "47"],
    ["Howard Hatfield", "Office Manager", "San Francisco", "51"],
    ["Hope Fuentes", "Secretary", "San Francisco", "41"],
    ["Vivian Harrell", "Financial Controller", "San Francisco", "62"],
    ["Timothy Mooney", "Office Manager", "London", "37"],
    ["Jackson Bradshaw", "Director", "New York", "65"],
    ["Olivia Liang", "Support Engineer", "Singapore", "64"]
];

class ListPrescriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
    }

    handleClickAdd = () => {
        this.props.history.push('/prescriptions/add')
    };

    handleClickEdit = () => {
        this.props.history.push('/prescriptions/edit/')
    };

    renderAction() {
        return dataTable.map((prop, key) => {
            return {
                id: key,
                patients: prop[0],
                diseases: prop[1],
                drugs: prop[2],
                quantity: prop[3],
                dose: prop[1],
                howtouse: prop[1],
                datetime: prop[3],
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
                                title="Prescriptions"
                                bigIcon={this.renderIconPlus()}
                                content={
                                    <ReactTable
                                        data={this.renderAction()}
                                        columns={[
                                            {
                                                Header: "NumPatients",
                                                accessor: "patients",
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
                                                Header: "NumDrugs",
                                                accessor: "drugs",
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

export default ListPrescriptions;
