import Room2 from 'assets/Room/room2.jpg';
import Room4 from 'assets/Room/room4.jpg';
import Room6 from 'assets/Room/room6.jpg';

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
