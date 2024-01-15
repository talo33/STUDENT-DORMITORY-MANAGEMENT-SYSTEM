import * as yup from 'yup';

import Room2 from 'assets/Room/room2.jpg';
import Room4 from 'assets/Room/room4.jpg';
import Room6 from 'assets/Room/room6.jpg';

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

export const RoomMenu = [
  {
    id: 1,
    name: 'Phòng 2',
    price: '1,250,000Đ/Tháng',
    description: '2 giường đơn',
    imageSrc: Room2,
    imageAlt: 'Room 2'
  },
  {
    id: 2,
    name: 'Phòng 4',
    price: '650,000Đ/Tháng',
    description: '4 giường đơn',
    imageSrc: Room4,
    imageAlt: 'Room 4'
  },
  {
    id: 3,
    name: 'Phòng 6',
    price: '240,000Đ/Tháng',
    description: '3 giường đôi',
    imageSrc: Room6,
    imageAlt: 'Room 6'
  }
];

export const sampleMenu = [
  {
    name: 'Phòng 2',
    price: '1,250,000Đ/Tháng',
    description: '2 giường đơn',
    imageSrc: Room2,
    imageAlt: 'Room 2',
    items: [
      {
        item_name: 'Máy lạnh',
        description: 'Phòng có máy lạnh',
        image: Room2
      },
      {
        item_name: 'Đặc điểm',
        description: 'Không gian rộng rãi, thoáng mát',
        image: Room2
      },
      {
        item_name: 'Giá phòng',
        description: '1,250,000Đ/Tháng',
        image: Room2
      }
    ]
  },
  {
    name: 'Phòng 4',
    price: '650,000Đ/Tháng',
    description: '4 giường đơn',
    imageSrc: Room4,
    imageAlt: 'Room 4',
    items: [
      {
        item_name: 'Máy lạnh',
        description: 'Không có máy lạnh',
        image: Room4
      },
      {
        item_name: 'Đặc điểm',
        description: 'Không gian rộng rãi, thoáng mát',
        image: Room4
      },
      {
        item_name: 'Giá phòng',
        description: '650,000Đ/Tháng',
        image: Room4
      }
    ]
  },
  {
    name: 'Phòng 6',
    price: '240,000Đ/Tháng',
    description: '3 giường đôi',
    imageSrc: Room6,
    imageAlt: 'Room 6',
    items: [
      {
        item_name: 'Máy lạnh',
        description: 'Không có máy lạnh',
        image: Room6
      },
      {
        item_name: 'Đặc điểm',
        description: 'Không gian rộng rãi, thoáng mát',
        image: Room6
      },
      {
        item_name: 'Giá phòng',
        description: '240,000Đ/Tháng',
        image: Room6
      }
    ]
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

export const getStatus = (statusId) => {
  switch (statusId) {
    case 0:
      return 'Chưa duyệt';
    case 1:
      return 'Đã duyệt';
    case 2:
      return 'Đã từ chối';
    default:
      break;
  }
};

export const getColorHistory = (status) => {
  switch (status) {
    case 2:
      return 'text-red-500';
    case 1:
      return 'text-green-500';
    default:
      return;
  }
};
