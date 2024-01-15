import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequestChange, requestChangeRoom } from 'API/requests';
import { getAllRooms, getDormitory } from 'API/room';
import { getColorHistory, getStatus } from 'utils/shared';

import { Modal, Select } from 'antd';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import InputWithLabel from 'components/Input/InputWithLabel';
import { GlobalContextProvider } from 'context/GlobalContext';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ChangeRoomForm = ({ title, onCancel }) => {
  const { profileData } = useContext(GlobalContextProvider);

  const queryClient = useQueryClient();

  const { handleSubmit } = useForm();

  const [options, setOptions] = useState([]);
  const [toRoom, setToRoom] = useState();

  const [dormData, setDormData] = useState();
  const [selectedRoom, setSelectedRoom] = useState('');

  const [openHistory, setOpenHistory] = useState(false);

  const { data: roomsData, isSuccess } = useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
    staleTime: 5000
  });

  const { data: dormsReturnData } = useQuery({
    queryKey: ['dorms'],
    queryFn: getDormitory
  });

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
      title: 'Loại',
      width: '50px',
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
        return profileData?.room?.roomId === record._id ? (
          <div>Phòng hiện tại</div>
        ) : (
          <div className="flex gap-3">
            <PrimaryButton
              text={selectedRoom._id !== record._id ? 'Chọn phòng' : 'Đã chọn'}
              disabled={selectedRoom._id === record._id}
              onClick={() => setSelectedRoom(record)}
              className="!bg-green-500 !hover:bg-green-400 disabled:!bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    if (isSuccess && dormData) {
      const newArray = dormData?.map((room) => ({
        value: JSON.stringify(room.Room),
        label: room.Name
      }));

      setOptions(newArray);
    }
  }, [isSuccess, dormData]);

  useEffect(() => {
    if (dormsReturnData && roomsData) {
      const updatedDormData = dormsReturnData?.map((dorm) => {
        const roomIds = dorm?.Room || [];
        const roomsInDorm = roomsData.filter((room) => roomIds.includes(room?._id));
        return { ...dorm, Room: roomsInDorm };
      });

      setDormData(updatedDormData);
    }
  }, [dormsReturnData, roomsData]);

  const onSubmit = () => {
    const data = {
      userId: profileData._id,
      userDetail: {
        CMND: profileData?.CMND,
        HoTen: profileData?.HoTen
      },
      originRoom: profileData?.room,
      toRoom: {
        roomId: selectedRoom?._id,
        roomTitle: selectedRoom?.Title,
        dateOut: profileData?.room?.dateOut,
        status: 0
      }
    };

    handleRequestChangeRoom.mutate({
      data
    });
  };

  const handleRequestChangeRoom = useMutation({
    mutationFn: requestChangeRoom,
    onSuccess: () => {
      toast.success('Yêu cầu chuyển phòng thành công');
      onCancel();
      queryClient.invalidateQueries({ queryKey: ['change_request_by_user'] });
    }
  });

  const handleChange = (value) => {
    const newRooms = JSON.parse(value)?.filter((room) => Number(room?.status) === 0);
    setToRoom(newRooms);
  };

  const { data: changeRoomRequest } = useQuery({
    queryKey: ['change_request_by_user'],
    queryFn: () => getRequestChange({ id: profileData?._id })
  });

  const historyColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: '50px',
      align: 'center',
      render: (_, record, i) => {
        return i + 1;
      }
    },
    {
      title: 'Phòng cũ',
      dataIndex: 'roomTitle',
      width: '100px',
      align: 'center',
      render: (_, record) => {
        return <div>{`Phòng ${record?.originRoom?.roomTitle}`}</div>;
      }
    },
    {
      title: 'Phòng mới',
      dataIndex: 'roomTitle',
      width: '100px',
      align: 'center',
      render: (_, record) => {
        return <div>{`Phòng ${record?.toRoom?.roomTitle}`}</div>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'requestStatus',
      align: 'center',
      width: '100px',
      render: (_, record) => {
        return <div className={`${getColorHistory(record?.requestStatus)}`}>{getStatus(record?.requestStatus)}</div>;
      }
    },
    {
      title: 'Lý do từ chối',
      dataIndex: 'rejectReason',
      width: '150px'
    }
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col gap-8 px-8">
        <div className="font-semibold text-xl">{title}</div>
        <div className="grid grid-cols-6 gap-3 w-full">
          <div className="col-span-2 w-full flex flex-col gap-2">
            <InputWithLabel label="CCCD" defaultValue={profileData?.CMND} disabled />
            <InputWithLabel label="Tên sinh viên" defaultValue={profileData?.HoTen} disabled />
            <InputWithLabel label="Phòng" defaultValue={profileData?.room?.roomTitle} disabled />
          </div>
          <div className="col-span-4">
            <div className="flex items-center gap-2">
              <div>Tầng muốn chuyển:</div> <br />
              <Select
                style={{
                  width: 120
                }}
                onChange={handleChange}
                options={options}
              />
            </div>
            <div className="mt-2">
              <CustomTable
                columns={columns}
                dataSource={toRoom}
                isPagination={false}
                scroll={{ x: 'max-content', y: 270 }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={() => setOpenHistory(true)}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Lịch sử
          </button>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Gửi
          </button>
        </div>
      </form>

      <Modal open={openHistory} footer={false} onCancel={() => setOpenHistory(false)} width={800}>
        <div className="w-full text-center text-xl font-semibold">Lịch sử</div>
        <CustomTable columns={historyColumns} dataSource={changeRoomRequest} isPagination={false} />
      </Modal>
    </>
  );
};

export default ChangeRoomForm;
