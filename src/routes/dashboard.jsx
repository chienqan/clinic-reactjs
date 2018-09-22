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
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import UserPage from "views/Pages/UserPage.jsx";

import pagesRoutes from "./pages.jsx";

var pages = [
  { path: "/user-page", name: "User Page", mini: "UP", component: UserPage }
].concat(pagesRoutes);

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
                path: "/diseases/edit",
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
            path: "/drugs/edit",
            name: "Edit",
            mini: "E",
            component: EditDrugs
        }
     ]
    },
    {
        collapse: true,
        path: "/labtest",
        name: "Lab Test",
        icon: "pe-7s-hourglass",
        state: "openLabTest",
        views: [
            {
                path: "/labtest/list",
                name: "List",
                mini: "L",
                component: ListLabTest
            },
            {
                path: "/labtest/add",
                name: "Add",
                mini: "A",
                component: AddLabTest
            },
            {
                path: "/labtest/edit",
                name: "Edit",
                mini: "E",
                component: EditLabTest
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
                path: "/patients/edit",
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
                path: "/prescriptions/edit",
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
                path: "/reports/patients",
                name: "Number of Patients",
                mini: "P",
                component: NumPatients
            },
            {
                path: "/reports/drugs",
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
                path: "/visits/edit",
                name: "Edit",
                mini: "E",
                component: EditVisits
            }
        ]
    },
  {
    collapse: true,
    path: "/components",
    name: "Components",
    state: "openComponents",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/components/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons
      },
      {
        path: "/components/grid-system",
        name: "Grid System",
        mini: "GS",
        component: GridSystem
      },
      {
        path: "/components/panels",
        name: "Panels",
        mini: "P",
        component: Panels
      },
      {
        path: "/components/sweet-alert",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert
      },
      {
        path: "/components/notifications",
        name: "Notifications",
        mini: "N",
        component: Notifications
      },
      { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
      {
        path: "/components/typography",
        name: "Typography",
        mini: "T",
        component: Typography
      }
    ]
  },
  {
    collapse: true,
    path: "/forms",
    name: "Forms",
    state: "openForms",
    icon: "pe-7s-note2",
    views: [
      {
        path: "/forms/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms
      },
      {
        path: "/forms/extended-forms",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms
      },
      {
        path: "/forms/validation-forms",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms
      },
      { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }
    ]
  },
  {
    collapse: true,
    path: "/tables",
    name: "Tables",
    state: "openTables",
    icon: "pe-7s-news-paper",
    views: [
      {
        path: "/tables/regular-tables",
        name: "Regular Tables",
        mini: "RT",
        component: RegularTables
      },
      {
        path: "/tables/extended-tables",
        name: "Extended Tables",
        mini: "ET",
        component: ExtendedTables
      },
      {
        path: "/tables/react-table",
        name: "React Table",
        mini: "RT",
        component: ReactTables
      }
    ]
  },
  {
    collapse: true,
    path: "/maps",
    name: "Maps",
    state: "openMaps",
    icon: "pe-7s-map-marker",
    views: [
      {
        path: "/maps/google-maps",
        name: "Google Maps",
        mini: "GM",
        component: GoogleMaps
      },
      {
        path: "/maps/full-screen-maps",
        name: "Full Screen Map",
        mini: "FSM",
        component: FullScreenMap
      },
      {
        path: "/maps/vector-maps",
        name: "Vector Map",
        mini: "VM",
        component: VectorMap
      }
    ]
  },
  { path: "/charts", name: "Charts", icon: "pe-7s-graph1", component: Charts },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "pe-7s-date",
    component: Calendar
  },
  {
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "pe-7s-gift",
    views: pages
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashboardRoutes;
