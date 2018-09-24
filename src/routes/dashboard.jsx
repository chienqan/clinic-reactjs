import ListDiseases from "views/Diseases/ListDiseases.jsx";
import AddDiseases from "views/Diseases/AddDiseases.jsx";
import EditDiseases from "views/Diseases/EditDiseases.jsx";
import ListPrescriptions from "views/Prescriptions/ListPrescriptions.jsx";
import AddPrescriptions from "views/Prescriptions/AddPrescriptions.jsx";
import EditPrescriptions from "views/Prescriptions/EditPrescriptions.jsx";
import ListDrugs from "views/Drugs/ListDrugs.jsx";
import AddDrugs from "views/Drugs/AddDrugs.jsx";
import EditDrugs from "views/Drugs/EditDrugs.jsx";
import ListLabTest from "views/LabTest/ListLabTest.jsx";
import AddLabServices from "views/LabServices/AddLabServices.jsx";
import ListLabServices from "views/LabServices/ListLabServices.jsx";
import EditLabServices from "views/LabServices/EditLabServices.jsx";
import AddLabTest from "views/LabTest/AddLabTest.jsx";
import EditLabTest from "views/LabTest/EditLabTest.jsx";
import NumPatients from "views/Reports/NumPatients.jsx";
import NumDrugs from "views/Reports/NumDrugs.jsx";
import ListPatients from "views/Patients/ListPatients.jsx";
import AddPatients from "views/Patients/AddPatients.jsx";
import EditPatients from "views/Patients/EditPatients.jsx";
import ListVisits from "views/Visits/ListVisits.jsx";
import AddVisits from "views/Visits/AddVisits.jsx";
import EditVisits from "views/Visits/EditVisits.jsx";

var dashboardRoutes = [
    {
        collapse: true,
        path: "/diseases",
        name: "Diseases",
        icon: "pe-7s-target",
        state: "openDiseases",
        views: [
            {
                path: "/diseases/list",
                name: "List",
                mini: "L",
                component: ListDiseases
            },
            {
                path: "/diseases/add",
                name: "Add",
                mini: "A",
                component: AddDiseases
            },
            {
                hidden: true,
                path: "/diseases/edit/:id",
                name: "Edit",
                mini: "E",
                component: EditDiseases
            }
        ]
    },
  {
     collapse: true,
     path: "/drugs",
     name: "Drugs",
     icon: "pe-7s-science",
     state: "openDrugs",
     views: [
        {
            path: "/drugs/list",
            name: "List",
            mini: "L",
            component: ListDrugs
        },
        {
            path: "/drugs/add",
            name: "Add",
            mini: "A",
            component: AddDrugs
        },
        {
            hidden: true,
            path: "/drugs/edit/:id",
            name: "Edit",
            mini: "E",
            component: EditDrugs
        }
     ]
    },
    {
        collapse: true,
        path: "/lab-test",
        name: "Lab Test",
        icon: "pe-7s-hourglass",
        state: "openLabTest",
        views: [
            {
                path: "/lab-test/list",
                name: "List",
                mini: "L",
                component: ListLabTest
            },
            {
                path: "/lab-test/add",
                name: "Add",
                mini: "A",
                component: AddLabTest
            },
            {
                hidden: true,
                path: "/lab-test/edit/:id",
                name: "Edit",
                mini: "E",
                component: EditLabTest
            }
        ]
    },
    {
        collapse: true,
        path: "/lab-services",
        name: "Lab Services",
        icon: "pe-7s-server",
        state: "openLabServices",
        views: [
            {
                path: "/lab-services/list",
                name: "List",
                mini: "L",
                component: ListLabServices
            },
            {
                path: "/lab-services/add",
                name: "Add",
                mini: "A",
                component: AddLabServices
            },
            {
                hidden: true,
                path: "/lab-services/edit/:id",
                name: "Edit",
                mini: "E",
                component: EditLabServices
            }
        ]
    },
    {
        collapse: true,
        path: "/patients",
        name: "Patients",
        icon: "pe-7s-users",
        state: "openPatients",
        views: [
            {
                path: "/patients/list",
                name: "List",
                mini: "L",
                component: ListPatients
            },
            {
                path: "/patients/add",
                name: "Add",
                mini: "A",
                component: AddPatients
            },
            {
                hidden: true,
                path: "/patients/edit/:id",
                name: "Edit",
                mini: "E",
                component: EditPatients
            }
        ]
    },
    {
        collapse: true,
        path: "/prescriptions",
        name: "Prescriptions",
        icon: "pe-7s-note2",
        state: "openPrescriptions",
        views: [
            {
                path: "/prescriptions/list",
                name: "List",
                mini: "L",
                component: ListPrescriptions
            },
            {
                path: "/prescriptions/add",
                name: "Add",
                mini: "A",
                component: AddPrescriptions
            },
            {
                hidden: true,
                path: "/prescriptions/edit/:id",
                name: "Edit",
                mini: "E",
                component: EditPrescriptions
            }
        ]
    },
    {
        collapse: true,
        path: "/reports",
        name: "Reports",
        icon: "pe-7s-news-paper",
        state: "openReports",
        views: [
            {
                path: "/reports/number-of-patient-visit-per-day",
                name: "Number of Patients",
                mini: "P",
                component: NumPatients
            },
            {
                path: "/reports/number-of-drug-used-per-day",
                name: "Number of Drugs",
                mini: "D",
                component: NumDrugs
            }
        ]
    },
    {
        collapse: true,
        path: "/visits",
        name: "Visits",
        icon: "pe-7s-bicycle",
        state: "openVisits",
        views: [
            {
                path: "/visits/list",
                name: "List",
                mini: "L",
                component: ListVisits
            },
            {
                path: "/visits/add",
                name: "Add",
                mini: "A",
                component: AddVisits
            },
            {
                hidden: true,
                path: "/visits/edit/:id",
                name: "Edit",
                mini: "E",
                component: EditVisits
            }
        ]
    },
  { redirect: true, path: "/", pathTo: "/diseases/list", name: "Disease List" }
];
export default dashboardRoutes;
