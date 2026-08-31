import authApi from "../api/authApi";

export const registerUser = async (formData) => {
  const response = await authApi.post("/register", formData);

  return response.data;
};

export const loginUser = async (formData) => {
  const response = await authApi.post("/login", formData);

  return response.data;
};
