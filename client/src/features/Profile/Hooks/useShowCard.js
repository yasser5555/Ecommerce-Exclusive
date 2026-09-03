import { useState } from "react";
import { toast } from "react-toastify";

import { useProfile } from "./useProfile";

export const useShowCard = () => {
  const {
    profile,
    userCards,
    Get_UserCards,
    add_UserCards,
    delete_UserCards,
    isLoading,
  } = useProfile();

  // ==========================================
  // Form State
  // ==========================================

  const initialFormData = {
    last4: "",
    card_type: "",
    bank_name: "",
    expiry_day: "",
    expiry_month: "",
    expiry_year: "",
    balance: "",
    isDefault: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(false);

  // ==========================================
  // Form Handlers
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const toggleForm = () => {
    setShowForm((prev) => {
      const newState = !prev;

      if (!newState) {
        resetForm();
      }

      return newState;
    });
  };

  // ==========================================
  // Fetch Cards
  // ==========================================

  const fetchCards = async () => {
    try {
      if (!profile?.id) {
        console.error("Profile ID is missing");
        return;
      }

      await Get_UserCards(profile.id);
    } catch (error) {
      console.error("Error fetching cards:", error);

      toast.error("Failed to load payment methods");
    }
  };

  // ==========================================
  // Validation
  // ==========================================

  const validateCard = () => {
    const {
      last4,
      card_type,
      bank_name,
      expiry_day,
      expiry_month,
      expiry_year,
      balance,
    } = formData;

    // Required fields
    if (
      !last4 ||
      !card_type ||
      !bank_name ||
      !expiry_day ||
      !expiry_month ||
      !expiry_year
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }

    // Last 4 digits
    if (!/^\d{4}$/.test(last4)) {
      toast.error("Last 4 digits must contain exactly 4 numbers");
      return false;
    }

    // Expiry month
    const month = Number(expiry_month);

    if (!Number.isInteger(month) || month < 1 || month > 12) {
      toast.error("Expiry month must be between 1 and 12");
      return false;
    }

    // Expiry day
    const day = Number(expiry_day);

    if (!Number.isInteger(day) || day < 1 || day > 30) {
      toast.error("Expiry day must be between 1 and 30");
      return false;
    }

    // Expiry year
    const year = Number(expiry_year);
    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(year) || year < currentYear) {
      toast.error(`Expiry year must be ${currentYear} or later`);
      return false;
    }

    // Balance
    if (balance !== "") {
      const numericBalance = Number(balance);

      if (Number.isNaN(numericBalance) || numericBalance < 0) {
        toast.error("Balance cannot be negative");
        return false;
      }
    }

    return true;
  };

  // ==========================================
  // Add Card
  // ==========================================

  const addUser_card = async () => {
    try {
      if (!profile?.id) {
        toast.error("Profile Error :(");
        return false;
      }

      if (!validateCard()) {
        return false;
      }

      const payload = {
        ...formData,
        last4: formData.last4.slice(-4),
        expiry_day: Number(formData.expiry_day),
        expiry_month: Number(formData.expiry_month),
        expiry_year: Number(formData.expiry_year),
        balance: formData.balance === "" ? 0 : Number(formData.balance),
      };

      // Add to database
      await add_UserCards(payload);

      /*
       * IMPORTANT:
       * Fetch the cards again from the backend.
       * This keeps Zustand synchronized with the DB.
       */
      await Get_UserCards(profile.id);

      toast.success("Card added successfully");

      resetForm();
      setShowForm(false);

      return true;
    } catch (error) {
      console.error("Error adding card:", error);

      toast.error(error.response?.data?.message || "Failed to add card");

      return false;
    }
  };

  // ==========================================
  // Delete Card
  // ==========================================

  const deleteUser_card = async (card_id) => {
    try {
      if (!card_id) {
        toast.error("Invalid card");
        return false;
      }

      if (!profile?.id) {
        toast.error("Profile Error :(");
        return false;
      }

      // Delete from database
      await delete_UserCards(card_id);
      // await Get_UserCards(profile.id);

      await Get_UserCards(profile.id);
      toast.success("Card deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error(error.response?.data?.message || "Failed to delete card");
      return false;
    }
  };

  const [cardToDelete, setCardToDelete] = useState(null);
  //
  const handleDeleteClick = (card) => {
    setCardToDelete(card);
  };

  const closeDeleteModal = () => {
    setCardToDelete(null);
  };

  const confirmDelete = async () => {
    if (!cardToDelete) return;
    await deleteUser_card(cardToDelete.user_id);
    setCardToDelete(null);
  };

  return {
    // ==========================
    // Data
    // ==========================

    userCards,
    profile,
    isLoading,

    // ==========================
    // Form
    // ==========================

    formData,
    showForm,

    // ==========================
    // Form Actions
    // ==========================

    handleChange,
    toggleForm,

    // ==========================
    // Card Actions
    // ==========================

    fetchCards,
    addUser_card,
    deleteUser_card,
    cardToDelete,
    handleDeleteClick,
    closeDeleteModal,
    confirmDelete,
  };
};
