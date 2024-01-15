import axiosInstance from './axiosInstance';

// Admin

export const getAllRequestCheckout = async () => {
  const res = await axiosInstance.get(`/rooms/checkout`);
  return res.data;
};

export const getAllRequestChange = async () => {
  const res = await axiosInstance.get(`/rooms/change-room`);
  return res.data;
};

export const getAllRequestExtendChange = async () => {
  const res = await axiosInstance.get(`/rooms/extend`);
  return res.data;
};

export const getAllRequestFixRoom = async () => {
  const res = await axiosInstance.get(`/rooms/fix`);
  return res.data;
};

// Update request
export const updateRequestCheckout = async ({ id, data }) => {
  const res = await axiosInstance.put(`/rooms/checkout/${id}`, data);
  return res.data;
};

export const updateRequestChangeRoom = async ({ id, data }) => {
  const res = await axiosInstance.put(`/rooms/change-room/${id}`, data);
  return res.data;
};

export const updateRequestExtendRoom = async ({ id, data }) => {
  const res = await axiosInstance.put(`/rooms/extend/${id}`, data);
  return res.data;
};

export const updateRequestFixRoom = async ({ id, data }) => {
  const res = await axiosInstance.put(`/rooms/fix/${id}`, data);
  return res.data;
};

// Student
export const requestCheckoutRoom = async ({ data }) => {
  const res = await axiosInstance.post(`/rooms/checkout`, data);
  return res.data;
};

export const requestChangeRoom = async ({ data }) => {
  const res = await axiosInstance.post(`/rooms/change-room`, data);
  return res.data;
};

export const requestExtendRoom = async ({ data }) => {
  const res = await axiosInstance.post(`/rooms/extend`, data);
  return res.data;
};

export const requestFixRoom = async ({ data }) => {
  const res = await axiosInstance.post(`/rooms/fix`, data);
  return res.data;
};
