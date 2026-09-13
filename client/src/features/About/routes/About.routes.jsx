import AboutPage from "../pages/About";
 export const AboutRoutes = {
  path: "/about",
  children: [
    {
      index: true,
      element: <AboutPage />,
    },
  ],
};
