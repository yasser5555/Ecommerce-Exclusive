import Products from "../Products/Pages/Products";
import Settings from "../pages/Settings";
 import Dashboard from "../Dashboard/Pages/Dashboard";
 
import Categories from "./../Categories/Pages/Categories";
import Orders from "../Orders/Pages/Orders";
import OrderDetails from "../Orders/Pages/OrderDetails";
import Reports from './../Reports/Pages/Reports';
import Users from "../Users/Pages/Users";
 
export const AdminRoutes = {
  path: "/admin",
  children: [
    {
      index: true,
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
      path: "orders/AdminOrderView/:orderId",
      element: <OrderDetails />,
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