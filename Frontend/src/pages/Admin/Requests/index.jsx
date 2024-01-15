import { Tabs } from 'antd';
import React from 'react';
import CheckoutRequest from './CheckoutRequest';
import ChangeRoomRequest from './ChangeRoomRequest';
import ExtendRequest from './ExtendRequest';
import FixRoomRequest from './FixRoom';

const items = [
  {
    key: '1',
    label: 'Trả phòng',
    children: <CheckoutRequest />
  },
  {
    key: '2',
    label: 'Chuyển phòng',
    children: <ChangeRoomRequest />
  },
  {
    key: '3',
    label: 'Gia hạn',
    children: <ExtendRequest />
  },
  {
    key: '4',
    label: 'Sửa phòng',
    children: <FixRoomRequest />
  }
];

const RequestsList = () => {
  return (
    <div className="p-8 h-full">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default RequestsList;
