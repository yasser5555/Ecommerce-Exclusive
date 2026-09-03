
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../auth/hooks/useAuth";
import { useProfileStore } from "../Store/profile.store";

function useProfileForm() {
  const { logout } = useAuth();

  const {
    profile,
    fetchProfile,
    updateProfile,
  } = useProfileStore();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    created_at: "",
    email: "",
    avatar: "",
  });

  // Fetch profile when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Put profile data into form
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone_number: profile.phone_number || "",
        gender: profile.gender || "",
        email: profile.email || "",
        created_at: profile.created_at || "",
        avatar: profile.avatar || "",
      });
    }
  }, [profile]);

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);

      toast.success("Profile Updated ✅");

      setIsEditing(false);
    } catch (error) {
      toast.error("Profile Update Failed ❌");
    }
  };

  // Reset form to original profile data
  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      phone_number: profile.phone_number || "",
      gender: profile.gender || "",
      email: profile.email || "",
      created_at: profile.created_at || "",
      avatar: profile.avatar || "",
    });

    setIsEditing(false);
  };
  return {
    profile,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
    handleCancel,
    logout,
  };
}

export default useProfileForm;
