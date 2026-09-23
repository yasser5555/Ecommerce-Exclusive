import Checkout from "../Pages/checkout";

export const CheckoutRoutes = {
  path: "/checkout",
  children: [{ 
    index:true,
    element: <Checkout/> 
  
  }],
};
