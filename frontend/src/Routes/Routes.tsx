import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import App from "../App";
import DashboardPage from "../Pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import TasksPage from "../Pages/TasksPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute>},
            { path: "tasks", element: <ProtectedRoute><TasksPage /></ProtectedRoute>}
        ]
    }
])