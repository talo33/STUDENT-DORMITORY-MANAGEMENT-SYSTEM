import { useQuery } from '@tanstack/react-query';
import { getBillDetail } from 'API/bill';
import { getColor } from 'DB';
import CustomTable from 'components/CustomTable';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext } from 'react';

const UserBill = ({ title }) => {
  const { profileData } = useContext(GlobalContextProvider);

  const { data: billDetail } = useQuery({
    queryFn: () => getBillDetail({ CMND: profileData?.CMND }),
    queryKey: ['bill_detail'],
    retry: 1
  });

  const columns = [
    {
      title: 'STT',
      width: 50,
      align: 'center',
      render: (value, record, index) => {
        return index + 1;
      }
    },
    {
      title: 'Hóa đơn',
      dataIndex: 'title'
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: '_id'
    },
    {
      title: 'Sinh viên',
      dataIndex: 'billDetails?.HoTen',
      render: (value, record, index) => {
        return record?.billDetails?.HoTen;
      }
    },
    {
      title: 'MSSV',
      dataIndex: 'Mssv',
      render: (value, record, index) => {
        return record?.billDetails?.Mssv;
      }
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      width: '70px',
      align: 'center',
      render: (_, record) => {
        return record?.billDetails?.roomName;
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      width: '100px',
      render: (_, record) => {
        return <div>{`${record?.price?.toLocaleString()}đ`}</div>;
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateOut',
      align: 'center',
      width: '120px',
      render: (_, record) => {
        console.log(record);
        return <div>{moment(record?.billDetails?.dateOut).format('DD/MM/YYYY')}</div>;
      }
    },

    {
      title: 'Người tạo',
      dataIndex: 'updatedBy'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <div className={getColor(record?.status)}>{record?.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</div>
        );
      }
    }
  ];
  return (
    <div className="text-xl font-semibold text-center w-full">
      {title}
      <CustomTable columns={columns} dataSource={billDetail} isPagination={false} />
    </div>
  );
};

export default UserBill;
