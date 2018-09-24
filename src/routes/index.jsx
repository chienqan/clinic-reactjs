import LoginPage from "views/Pages/LoginPage.jsx";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";

var indexRoutes = [
  { path: "/login", name: "Login Page", component: LoginPage },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
