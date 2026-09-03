import { toast } from "react-toastify";
import { useProfile } from "./useProfile";
import { useState } from "react";

export const useAvatarUploader = () => {
  const { profile, uploadAvatar } = useProfile();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await uploadAvatar(formData);
      setFile(null);
    } catch (error) {
      toast.error(`Avatar upload error: ${error}`);
    }
  };
  return {
    profile,
    uploadAvatar,
    file,
    handleSubmit,
    handleFileChange,
  }
};
