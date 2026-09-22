import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Settings from "../pages/Settings";
import Users from "../pages/Users";
import AdminHome from './../pages/AdminHome';
import Reports from './../pages/Reports';

export const AdminRoutes = {
  path: "/admin",
  children: [
    {
      index: true,
      element: <AdminHome />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "products",
      element: <Products />,
    },
    {
      path: "categories",   
      element: <Categories />,
    },
    {
      path: "orders",
      element: <Orders />,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "reports",
      element: <Reports />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
  ],
};