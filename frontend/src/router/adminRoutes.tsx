import type { RouteObject } from "react-router-dom";
import AdminLoginPage from "../pages/AdminLogin/Index";
import AdminOverview from "@/pages/AdminOverview";
import AdminLayout from "@/components/AdminLayout";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminOverview />,
      },
      {
        path: "/admin/genres",
        element: "Admin Genres Page",
      },
    ],
  },
];
export default adminRoutes;
