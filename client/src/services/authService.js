import authApi from "../api/authApi";
import api from "../api/axiosInstance";

export const registerUser = async (formData) => {
  const response = await authApi.post("/register", formData);

  return response.data;
};

export const loginUser = async (formData) => {
  const response = await authApi.post("/login", formData);

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const logoutUser = async () => {
  const response = await authApi.post("/logout");
  return response.data;
};

export const refreshUser = async () => {
  const response = await authApi.post("/refresh");
  return response.data;
};
