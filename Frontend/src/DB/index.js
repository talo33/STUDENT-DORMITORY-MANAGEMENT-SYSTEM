import * as yup from 'yup';

export const profileSchema = yup
  .object({
    HoTen: yup.string().required(),
    Phone: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'SĐT Phải có 10 hoặc 11 số', (val) => val.length === 10 || val.length === 11),
    CMND: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'CMND/CCCD Phải có 9 hoặc 12 số', (val) => val.length === 9 || val.length === 12),
    Mssv: yup.string().required(),
    Truong: yup.string().required(),
    GioiTinh: yup.string().required(),
    NganHang: yup.string().required(),
    Email: yup.string().required(),
    Address: yup.string().required()
  })
  .required();

export const inputProfileArray = [
  { htmlFor: 'HoTen', label: 'Họ tên' },
  { htmlFor: 'Phone', label: 'Số điện thoại' },
  { htmlFor: 'CMND', label: 'CMND/CCCD' },
  { htmlFor: 'Mssv', label: 'MSSV' },
  { htmlFor: 'Email', label: 'Email' },
  { htmlFor: 'NganHang', label: 'Ngân hàng' },
  { htmlFor: 'Address', label: 'Địa chỉ', isFull: true }
];

export const universities = [
  {
    id: 'HCMUT',
    name: 'Đại học Bách khoa'
  },
  {
    id: 'HCMUS',
    name: 'Đại học Khoa học Tự nhiên'
  },
  {
    id: 'USSH',
    name: 'Đại học Khoa học Xã hội và Nhân văn'
  },
  {
    id: 'HCMIU',
    name: 'Đại học Quốc tế'
  },
  {
    id: 'UIT',
    name: 'Đại học Công nghệ Thông tin'
  },
  {
    id: 'UEL',
    name: 'Đại học Kinh tế - Luật'
  },
  {
    id: 'AGU',
    name: 'Đại học An Giang'
  },
  {
    id: 'MEDVNU',
    name: 'Khoa Y'
  }
];

export const getColor = (status) => {
  switch (status) {
    case 0:
      return 'text-red-500';
    case 1:
      return 'text-green-500';
    default:
      return;
  }
};

export const getColorStatus = (status) => {
  switch (status) {
    case 1:
      return 'text-green-500';
    case 2:
      return 'text-red-500';
    default:
      return '';
  }
};
