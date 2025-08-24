import type { RouteObject } from "react-router-dom";
import AdminLoginPage from "../pages/AdminLogin/Index";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: "adminPage",
  },
];
export default adminRoutes;
