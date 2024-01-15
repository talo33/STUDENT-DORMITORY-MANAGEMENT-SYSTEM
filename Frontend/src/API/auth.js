import axiosInstance from './axiosInstance';

export const login = async (body) => {
  const response = await axiosInstance.post(`/auth/login`, body);
  return response.data;
};

export const changePassword = async ({ id, data }) => {
  const response = await axiosInstance.put(`/auth/account/${id}`, data);
  return response.data;
};
