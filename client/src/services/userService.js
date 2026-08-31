import userApi from "../api/userApi";

export const getUsers = async (page = 1, limit = 10) => {
  const response = await userApi.get(`?page=${page}&limit=${limit}`);

  return response.data;
};

export const createUser = async (userData) => {
  const response = await userApi.post("/", userData);

  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await userApi.put(`/${id}`, userData);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await userApi.delete(`/${id}`);
  return response.data;
};
