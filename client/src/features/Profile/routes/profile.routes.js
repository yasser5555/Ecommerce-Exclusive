// import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../../auth/routes/ProtectedRoute";
import CreditCardManager from "../Component/UserCard.jsx";
 import ProfileForm from "../Component/ProfileForm";
import ProfilePage from "../pages/ProfilePage";
import AddressManager from "./../Component/Address_manager";

export const profileRoutes = {
  path: "/profile",
  element: <ProfilePage />,
  children: [
    {
      index: true,
      element: <ProfileForm />,
    },
    {
      path: "my_credits",
      element: <CreditCardManager />,
    },
    {
      path: "addresses",
      element: <AddressManager />,
    },
    
  ],
};
