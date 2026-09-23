import { useState } from "react";
import { useProfileStore } from "./../../../Profile/Store/profile.store";
import { useCheckoutStore } from "../Store/Checkout.store";
export default function useBillingDetails() {
  // ! Getting user data for order
  const { profile, userAddresses, fetchUserAddresses } = useProfileStore();
  // ! For Linking Selected Address from Component to another
  const { selectedAddress, setselectedAddress } = useCheckoutStore();
  // ! For address Accordin
  const [openAddress, setOpenAddress] = useState(null);

  const get_address = async () => {
    try {
      await fetchUserAddresses();
    } catch (error) {
      console.error(`error during fetching address ${error}`);
    }
  };

  const handleSelectAddress = (address, index) => {
    setselectedAddress(address);
    setOpenAddress(index);
  };

  const selectAddress = () => {
    // ! if user have addresses then choose 1st by default
    if (userAddresses?.length > 0) {
      const firstAddress = userAddresses[0];
      setselectedAddress(firstAddress);
      setOpenAddress(0);
    }
  };

  return {
    profile,
    userAddresses,
    get_address,
    selectedAddress,
    setselectedAddress,
    openAddress,
    setOpenAddress,
    handleSelectAddress,
    selectAddress,
  };
}
