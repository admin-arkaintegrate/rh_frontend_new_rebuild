import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/settings/Settings";
import Doctors from "../pages/doctors/Doctors";
import TelePriv from "../pages/tele-priv/TelePriv";
import Notfound from "../pages/not-found/Notfound";
import ProtectedRoute from "./ProtectedRoute";
import TeleMed from "../pages/tele-med/TeleMed";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: (
      // <ProtectedRoute>
        <MainLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/tele-med",
        element: <TeleMed />,
      },
      {
        path: "/tele-priv",
        element: <TelePriv />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
