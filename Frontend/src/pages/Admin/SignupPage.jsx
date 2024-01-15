import { useMutation, useQuery } from '@tanstack/react-query';
import { createBill } from 'API/bill';
import { getAllRooms, getDormitory, updateRoom } from 'API/room';
import { createStudentAccount, createStudentInformation } from 'API/user';
import { Steps } from 'antd';
import ProfileForm from 'components/Form/ProfileForm';
import SignUpRoom from 'components/SelectRoom';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const navigate = useNavigate();
  const { profileData } = useContext(GlobalContextProvider);

  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  const [informationData, setInformationData] = useState({});
  const [dob, setDob] = useState('');
  const [room, setRoom] = useState();

  const [selectedRoom, setSelectedRoom] = useState('');
  const [dormData, setDormData] = useState();
  const [billData, setBillData] = useState();

  const { data: roomsData, isSuccess } = useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
    staleTime: 5000
  });

  const { data: dormsReturnData } = useQuery({
    queryKey: ['dorms'],
    queryFn: getDormitory
  });

  useEffect(() => {
    if (dormsReturnData && roomsData) {
      const updatedDormData = dormsReturnData?.map((dorm) => {
        const roomIds = dorm.Room || [];
        const roomsInDorm = roomsData.filter((room) => roomIds.includes(room?._id));
        return { ...dorm, Room: roomsInDorm };
      });

      setDormData(updatedDormData);
    }
  }, [dormsReturnData, roomsData]);

  useEffect(() => {
    if (isSuccess && dormData) {
      const newArray = dormData?.map((room) => ({
        value: JSON.stringify(room.Room),
        label: room.Name
      }));

      setOptions(newArray);
    }
  }, [isSuccess, dormData]);

  const handleChange = (value) => {
    const newRooms = JSON.parse(value)?.filter((room) => Number(room?.status) === 0);
    setRoom(newRooms);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const createAccountStudent = useMutation({
    mutationFn: createStudentAccount,

    onSuccess: (res) => {
      createAccountInformation.mutate({
        ...informationData,
        Matk: res.id,
        room: {
          roomId: selectedRoom._id,
          roomTitle: selectedRoom?.Title,
          dateIn: moment().toDate(),
          dateOut: moment().add(1, 'months').toDate(),
          status: 0
        }
      });
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const createAccountInformation = useMutation({
    mutationFn: createStudentInformation,
    onSuccess: (res) => {
      setBillData(res);
      const { HoTen, _id, CMND, Mssv, Truong, Phone, Email } = res;

      updateSelectedRoom.mutate({
        id: res?.room?.roomId,
        data: [
          ...selectedRoom?.roomMembers,
          {
            HoTen,
            userId: _id,
            Mssv,
            CMND,
            Truong,
            Phone,
            Email,
            dateIn: res?.room?.dateIn,
            dateOut: res?.room?.dateOut
          }
        ]
      });
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const handleRegister = () => {
    if (selectedRoom) {
      createAccountStudent.mutate({
        CMND: informationData?.CMND,
        MatKhau: 'Password@123',
        RoleId: process.env.REACT_APP_STUDENT_ROLE_ID
      });
    }
  };

  const steps = [
    {
      title: 'Thông tin cá nhân',
      content: (
        <ProfileForm
          next={next}
          isSignUp
          setInformationData={setInformationData}
          setDob={setDob}
          dob={dob}
          dataSource={informationData}
        />
      )
    },
    {
      title: 'Phòng',
      content: (
        <SignUpRoom
          handleChange={handleChange}
          options={options}
          handleRegister={handleRegister}
          prev={prev}
          rooms={room}
          setSelectedRoom={setSelectedRoom}
          selectedRoom={selectedRoom}
        />
      )
    }
  ];

  const items = steps?.map((item) => ({ key: item.title, title: item.title }));

  const updateSelectedRoom = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      createRoomBill.mutate({
        data: {
          title: 'Tiền phòng',
          roomId: billData.room?.roomId,
          price: selectedRoom.Price,
          status: 0,
          CMND: billData.CMND,
          userId: billData._id,
          Mssv: billData.CMND,
          roomName: selectedRoom.Title,
          dateIn: billData?.room?.dateIn,
          dateOut: billData?.room?.dateOut,
          createdBy: profileData?.HoTen,
          updatedBy: profileData?.HoTen
        }
      });

      toast.success('Tạo tài khoản cho sinh viên thành công');
      // navigate('/admin');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const createRoomBill = useMutation({
    mutationFn: createBill,
    onSuccess: () => {
      navigate('/admin');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  return (
    <div className="px-16 py-8">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Đăng ký người dùng</h3>
      </div>
      <div className="mt-8">
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
      </div>
    </div>
  );
};

export default SignupPage;
