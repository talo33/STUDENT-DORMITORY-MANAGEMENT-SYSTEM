import { Select } from 'antd';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import React, { useEffect, useState } from 'react';

const SignUpRoom = ({ handleChange, options, handleRegister, prev, rooms, setSelectedRoom, selectedRoom }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(rooms);
  }, [rooms]);

  const columns = [
    {
      title: 'Phòng',
      dataIndex: 'Title',
      align: 'center'
    },
    {
      title: 'Giá',
      dataIndex: 'Price',
      align: 'center'
    },
    {
      title: 'Loại phòng',
      dataIndex: 'Slot',
      align: 'center'
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      render: (_, record) => {
        return Number(record?.status) === 0 ? `Còn trống ${record.availableSlot} chỗ` : 'Đã đầy';
      }
    },
    {
      title: 'Tác vụ',
      key: 'action',
      render: (_, record) => {
        return (
          Number(record?.status) === 0 && (
            <div className="flex gap-3">
              <PrimaryButton
                text={selectedRoom._id !== record._id ? 'Chọn phòng' : 'Đã chọn'}
                disabled={selectedRoom._id === record._id}
                onClick={() => setSelectedRoom(record)}
                className="!bg-green-500 !hover:bg-green-400 disabled:!bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          )
        );
      }
    }
  ];

  return (
    <div className="bg-white rounded-md">
      <div className="flex flex-col justify-center items-center p-16">
        <div>
          <div>Tầng</div> <br />
          <Select
            style={{
              width: 120
            }}
            onChange={handleChange}
            options={options}
          />
        </div>
      </div>

      <CustomTable columns={columns} dataSource={dataSource} isPagination={false} />

      <div className="flex justify-end w-full px-8 py-4 gap-4">
        <button className=" bg-red-500 p-3 px-6 text-white rounded-xl" onClick={prev}>
          Quay lại
        </button>
        <button className=" bg-blue-500 p-3 px-6 text-white rounded-xl" onClick={handleRegister}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default SignUpRoom;
