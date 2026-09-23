import Homepage from "./../pages/Home";
export const HomeRoutes = {
  path: "/home",
  children: [
    {
      index: true,
      element: <Homepage />,
    },
  ],
};
