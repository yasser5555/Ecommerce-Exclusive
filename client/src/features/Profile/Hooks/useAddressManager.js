import { useState } from "react";
import { useProfile } from "./useProfile";
import { toast } from "react-toastify";

export const useAddressmanager = () => {
  const {
    profile,
    fetchUserAddresses,
    add_UserAddress,
    userAddresses,
    isLoading,
  } = useProfile();
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street_number: "",
    building_number: "",
    apartement_number: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.country ||
      !formData.city ||
      !formData.street_number ||
      !formData.building_number ||
      !formData.apartement_number
    ) {
      toast.error("Please fill in all address information ❌");
      return;
    }
    try {
      // Payload matches your backend exactly
      const payload = {
        country: formData.country,
        city: formData.city,
        street_number: formData.street_number,
        building_number: formData.building_number,
        apartement_number: formData.apartement_number,
      };

      await add_UserAddress(payload);
      toast.success("Address added successfully ✅");
      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add address ❌",
      );
    }
  };
  const resetForm = () => {
    setFormData({
      country: "",
      city: "",
      street_number: "",
      building_number: "",
      apartement_number: "",
    });

    setIsAdding(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const loadAddresses = async () => {
      try {
        await fetchUserAddresses();
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

  return {
    profile,
    fetchUserAddresses,
    add_UserAddress,
    userAddresses,
    isLoading,
    formData,
    isAdding,
    setIsAdding,
    resetForm,
    handleSubmit,
    handleChange,
    loadAddresses
  };
};
