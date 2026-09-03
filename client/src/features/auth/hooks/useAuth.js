import { useAuthStore } from "../store/auth.store";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  return useAuthStore();
};

