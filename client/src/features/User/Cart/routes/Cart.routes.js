import ShoppingCart from "../Page/shopping-cart.jsx";
export const CartRoutes = {
  path: "/cart",
  children: [
    {
      index: true,
      element: <ShoppingCart />,
    },
  ],
};
