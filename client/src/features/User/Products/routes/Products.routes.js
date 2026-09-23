import Productdetails from "../Page/Productdetails.jsx";
import Productspage from "../Page/Productspage.jsx";
export const productsRoutes = {
  path: "/products",
  children: [
    {
      index: true,

      element: (
        <Productspage />
      ),
    },
    {
      path: "/products/:id",
      element: <Productdetails />,
    },
  ],
};
