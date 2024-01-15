import { PlusIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBill, getAllBills, updateBill } from 'API/bill';

import { getAllStudent } from 'API/user';
import { getColor } from 'DB';
import { Modal, Select, Space } from 'antd';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import DatePicker from 'components/DatePicker';
import InputWithLabel from 'components/Input/InputWithLabel';
import SectionHeaderWithSearch from 'components/SectionHeader/SectionHeaderWithSearch';
import EditIcon from 'components/icons/EditIcon';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDebounce } from 'utils/hook/useDebounce';

const BillListPage = () => {
  const queryClient = useQueryClient();
  const { profileData } = useContext(GlobalContextProvider);

  const { data: allBills } = useQuery({
    queryKey: ['all_bills'],
    queryFn: getAllBills
  });

  const { data: allUser } = useQuery({
    queryKey: ['get_all_user'],
    queryFn: getAllStudent
  });

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [newBillModal, setNewBillModal] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const [dateIn, setDateIn] = useState();
  const [dateOut, setDateOut] = useState();

  const [billDataQuery, setBillDataQuery] = useState([]);
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    if (allUser) {
      const newArray = allUser?.map((user) => ({
        value: JSON.stringify(user),
        label: user.HoTen
      }));

      setUserOptions(newArray);
    }
  }, [allUser]);

  useEffect(() => {
    setBillDataQuery(allBills);
  }, [allBills]);

  useEffect(() => {
    if (allBills) {
      let updatedList = [...allBills];
      updatedList = updatedList?.filter((item) => {
        return deepSearch(item, debouncedValue);
      });
      setBillDataQuery(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const deepSearch = (obj, query) => {
    return Object.values(obj).some((value) => {
      if (typeof value === 'object' && value !== null) {
        return deepSearch(value, query);
      } else if (typeof value === 'string' || value instanceof String) {
        return value.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
      return false;
    });
  };

  const { register, handleSubmit, reset } = useForm();

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
      title: 'Sinh viên',
      dataIndex: 'billDetails.Student',
      render: (_, record) => {
        return <div className="text-center">{record.billDetails?.HoTen}</div>;
      }
    },
    {
      title: 'Phòng',
      dataIndex: 'billDetails',
      render: (_, record) => {
        return <div className="text-center">Phòng {record.billDetails?.roomName}</div>;
      }
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'price',
      render: (_, record) => {
        return <div className="text-center">{record.price?.toLocaleString()}đ</div>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <div className={`text-center ${getColor(record?.status)}`}>
            {record?.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </div>
        );
      }
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'billDetails',
      render: (_, record) => {
        return <div className="text-center">{moment(record?.billDetails?.dateOut).format('DD/MM/YYYY')}</div>;
      }
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      render: (_, record) => {
        return <div className="text-center">{moment(record.updatedAt).format('DD/MM/YYYY')}</div>;
      }
    },
    {
      title: 'Tác vụ',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <PrimaryButton
            text="Cập nhật"
            Icon={EditIcon}
            onClick={() => {
              setIsModalEdit(true);
              setEditData(record);
            }}
          />
        </Space>
      )
    }
  ];

  const updateBillData = useMutation({
    mutationFn: updateBill,
    onSuccess: () => {
      toast.success('Thành công');
      setIsModalEdit(false);
      queryClient.invalidateQueries({ queryKey: ['all_bills'] });
      queryClient.invalidateQueries({ queryKey: ['all_rooms'] });

      setSelectedUser({});
      setDateIn('');
      setDateOut('');
      reset();
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại!');
    }
  });

  const handlePaid = () => {
    updateBillData.mutate({
      id: editData?._id,
      data: {
        status: 1,
        updatedBy: profileData?.HoTen
      }
    });
  };

  const handleChangeUser = (value) => {
    setSelectedUser(JSON.parse(value));
  };

  const onSubmit = (data) => {
    updateBillData.mutate({
      id: editData?._id,
      data: {
        ...data,
        updatedBy: profileData?.HoTen,
        billDetails: {
          ...editData.billDetails,
          dateIn: moment(data.dateIn, 'DD/MM/YYYY').toDate(),
          dateOut: moment(data.dateOut, 'DD/MM/YYYY').toDate()
        }
      }
    });
  };

  const handleCreateBill = useMutation({
    mutationFn: createBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_bills'] });
      queryClient.invalidateQueries({ queryKey: ['get_all_user'] });

      toast.success('Tạo thành công');
      setNewBillModal(false);
      reset();
    }
  });

  const onCreateBill = (formData) => {
    const data = {
      ...formData,
      dateIn: moment(dateIn, 'DD/MM/YYYY').toDate(),
      dateOut: moment(dateOut, 'DD/MM/YYYY').toDate(),
      roomId: selectedUser?.room?.roomId,
      status: 0,
      CMND: selectedUser?.CMND,
      userId: selectedUser?._id,
      Mssv: selectedUser?.Mssv,
      roomName: selectedUser?.room?.roomTitle,
      updatedBy: profileData?.HoTen,
      createdBy: profileData?.HoTen
    };

    handleCreateBill.mutate({
      data
    });
  };

  return (
    <div className="p-8">
      <SectionHeaderWithSearch title={'Danh sách hóa đơn'} placeholder={'Tìm hóa đơn'} setQuery={setQuery} />
      <div className="text-end mb-2">
        <PrimaryButton text={'Tạo hóa đơn'} Icon={PlusIcon} onClick={() => setNewBillModal(true)} />
      </div>
      <CustomTable columns={columns} dataSource={billDataQuery} isPagination={false} />
      <Modal open={isModalEdit} onCancel={() => setIsModalEdit(false)} footer={false}>
        <div className="text-center w-full text-xl font-semibold my-3">Sửa thông tin hóa đơn</div>
        <form className="flex justify-center flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <InputWithLabel label={'Sinh viên'} defaultValue={editData?.billDetails?.HoTen} disabled={true} />
            <InputWithLabel label={'Phòng'} defaultValue={editData?.billDetails?.roomName} disabled={true} />
            <InputWithLabel label={'Giá'} defaultValue={editData?.price} disabled />
            <InputWithLabel
              label={'Ngày bắt đầu'}
              defaultValue={moment(editData?.billDetails?.dateIn).format('DD/MM/YYYY')}
              register={register}
              registerKey={'dateIn'}
            />
            <InputWithLabel
              label={'Ngày hết hạn'}
              defaultValue={moment(editData?.billDetails?.dateOut).format('DD/MM/YYYY')}
              register={register}
              registerKey={'dateOut'}
            />
          </div>
          <div className="mt-5 sm:mt-4 flex justify-between">
            <div>
              {editData?.status === 0 && (
                <PrimaryButton
                  text={'Đã thanh toán'}
                  className={'!bg-green-500 hover:!bg-green-400'}
                  onClick={handlePaid}
                />
              )}
            </div>
            <div className="sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto
                disabled:bg-red-200 disabled:hover:bg-red-200"
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setIsModalEdit(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal open={newBillModal} onCancel={() => setNewBillModal(false)} footer={false}>
        <form className="flex justify-center flex-col gap-3" onSubmit={handleSubmit(onCreateBill)}>
          <div className="flex flex-col gap-3">
            <InputWithLabel label={'Tên hóa đơn'} register={register} registerKey={'title'} />
            <div>
              <div>Sinh viên</div>
              <Select onChange={handleChangeUser} options={userOptions} className="w-full" />
            </div>
            <InputWithLabel label={'Giá'} register={register} registerKey={'price'} />
            {/* Date In */}
            <div>
              <label>Ngày bắt đầu</label>
              <DatePicker className={'!max-w-full'} setSelectedDate={setDateIn} />
            </div>
            {/* DateOut */}
            <div>
              <label>Ngày kết thúc</label>
              <DatePicker className={'!max-w-full'} setSelectedDate={setDateOut} />
            </div>
          </div>
          <div className="mt-5 sm:mt-4 flex justify-between">
            <div className="sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto
                disabled:bg-red-200 disabled:hover:bg-red-200"
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setIsModalEdit(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BillListPage;
