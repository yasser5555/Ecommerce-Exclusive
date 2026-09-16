import OrderConfirmation from "../Pages/OrderConfirmation";
import OrderDetails from "../Pages/OrderDetails";

export const OrderRoutes = {
  path: "/orderConfirmation/:id",
  children: [{ index: true, element: <OrderConfirmation /> } , 
    // {path:"/detials" ,element:<OrderDetails/>}
  ],
};
