const { default: axiosInstance } = require('./axiosInstance');

export const getRoom = async (id) => {
  const res = await axiosInstance.get(`/rooms/${id}`);
  return res.data;
};

export const getAllRooms = async () => {
  const res = await axiosInstance.get('/rooms');
  return res.data;
};

export const getDormitory = async () => {
  const res = await axiosInstance.get('/dormitorys');
  return res.data;
};

export const getDormitoryRoom = async (id) => {
  const res = await axiosInstance.get(`/dormitorys/room/${id}`);
  return res.data;
};

export const addRoom = async ({ id, data }) => {
  const res = await axiosInstance.post(`/rooms`, data, { params: { dormitoryId: id } });
  return res.data;
};

export const updateRoom = async ({ id, data }) => {
  const res = await axiosInstance.put(`/rooms/${id}`, {
    roomMembers: data
  });
  return res.data;
};

export const deleteRoom = async ({ id, dormitoryId, CMND }) => {
  const res = await axiosInstance.delete(`/rooms/${id}/${dormitoryId}`, { params: { dormitoryId }, data: { CMND } });
  return res.data;
};
