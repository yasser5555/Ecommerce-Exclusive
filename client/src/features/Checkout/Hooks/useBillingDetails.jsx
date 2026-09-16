import { useState } from "react";
import { useProfileStore } from "./../../Profile/Store/profile.store";
import { useCheckoutStore } from "../Store/Checkout.store";
export default function useBillingDetails() {
  const { profile, userAddresses, fetchUserAddresses } = useProfileStore();
  const { selectedAddress, setselectedAddress } = useCheckoutStore();

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
