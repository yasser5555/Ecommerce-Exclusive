import OrderConfirmation from "../Pages/OrderConfirmation";
import OrderDetails from "../Pages/OrderDetails";
import MyOrders from "./../Pages/MyOrders";

export const OrderRoutes = {
  path: "/myorders/",
  children: [
    {
      index: true,
      element: <MyOrders />,
    },
    { 
      path: "orderDetials/:order_id", 
      element: <OrderDetails />   
    },
    { 
      path: "orderConfirmation/:orderID", 
      element: <OrderConfirmation />   
    },
  ],
};
