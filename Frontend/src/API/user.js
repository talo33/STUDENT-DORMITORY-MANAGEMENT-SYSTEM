const { default: axiosInstance } = require('./axiosInstance');

export const getAllStudent = async () => {
  const res = await axiosInstance.get('/user');
  return res.data;
};

export const createStudentInformation = async (body) => {
  const res = await axiosInstance.post('/User', body);
  return res.data;
};

export const updateStudentInformation = async ({ id, data }) => {
  const res = await axiosInstance.put(`/User/${id}`, data);
  return res.data;
};

export const createStudentAccount = async (body) => {
  const res = await axiosInstance.post('/auth/register', body);
  return res.data;
};

export const getProfileInformation = async ({ userId }) => {
  const res = await axiosInstance.get(`/User/${userId}`);
  return res.data;
};

export const deleteStudent = async ({ id, CMND }) => {
  const res = await axiosInstance.delete(`/user/${id}`, { params: { id: id }, data: { CMND } });
  return res.data;
};

export const deleteAccount = async ({ id }) => {
  const res = await axiosInstance.delete(`/auth/account/${id}`);
  return res.data;
};
