import Productdetails from "../Page/Productdetails.jsx";
import Productspage from "../Page/Productspage.jsx";
export const productsRoutes = {
  path: "/products",
  children: [
    {
      index: true,
      element: <Productspage />,
    },
    {
      path:"/products/:id",
      element:<Productdetails/>
    }
    //     {
    //       path: "my_credits",
    //       element: <CreditCardManager/>
    //     },
    //     {
    //       path: "addresses",
    //       element: <AddressManager/>
    //     },
    //     {
    //       path: "order_history",
    //       element: <OrderHistory/>
    //     },
  ],
};
