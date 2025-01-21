import MasterLayout from "../components/layouts/MasterLayout";
import Dashboard from "../components/pages/home/Dashboard";
import Login from "../components/pages/login/Login";
import Parameter from "../components/pages/parameter/Parameter";

export const appRoutes = [
  {
    path: "*",
    element: <Login />,
    protected: false
  },
  {
    path: "/login",
    element: <Login />,
    protected: false
  },
  {
    path: "/dashboard",
    element: <MasterLayout child={<Dashboard />} />,
    protected: true
  },
  {
    path: "/parameter",
    element: <MasterLayout child={<Parameter />} />,
    protected: true
  }
];
