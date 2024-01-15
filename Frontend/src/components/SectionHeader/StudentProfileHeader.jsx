import { useMutation } from '@tanstack/react-query';
import { getProfileInformation, updateStudentInformation } from 'API/user';
import { Modal } from 'antd';
import InputWithLabel from 'components/Input/InputWithLabel';
import ChangePassModal from 'components/Modal/ChangePass';
import { GlobalContextProvider } from 'context/GlobalContext';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const StudentProfileHeader = () => {
  const { register, handleSubmit, reset } = useForm();
  const { profileData, setDataUser } = useContext(GlobalContextProvider);
  const [open, setOpen] = useState(false);
  const [openChangeBank, setOpenChangeBank] = useState(false);
  const [openChangePhone, setOpenChangePhone] = useState(false);

  const getCurrentUser = async (userId) => {
    try {
      const res = await getProfileInformation({ userId });
      setDataUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = useMutation({
    mutationFn: updateStudentInformation,
    onSuccess: () => {
      toast.success('Đổi thành công');
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      getCurrentUser(currentUser._id);
      setOpenChangeBank(false);
      setOpenChangePhone(false);
      reset();
    }
  });

  const onSubmit = (formData) => {
    handleUpdateUser.mutate({
      id: profileData._id,
      data: formData
    });
  };

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Thông tin sinh viên</h3>
        <div className="mt-3 sm:ml-4 sm:mt-0 flex gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi mật khẩu
          </button>

          <button
            type="button"
            onClick={() => setOpenChangeBank(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi tài khoản ngân hàng
          </button>

          <button
            type="button"
            onClick={() => setOpenChangePhone(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi số điện thoại
          </button>
        </div>
      </div>
      <ChangePassModal open={open} setOpen={setOpen} />
      <Modal open={openChangeBank} onCancel={() => setOpenChangeBank(false)} footer={false}>
        <div className="text-lg font-semibold w-full text-center">Đổi tài khoản ngân hàng</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="mt-2">
            <InputWithLabel label={'Ngân hàng hiện tại'} disabled defaultValue={profileData?.NganHang} />
            <InputWithLabel label={'Ngân hàng mới'} register={register} registerKey={'NganHang'} />
          </div>

          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Xác nhận
          </button>
        </form>
      </Modal>

      <Modal open={openChangePhone} onCancel={() => setOpenChangePhone(false)} footer={false}>
        <div className="text-lg font-semibold w-full text-center">Đổi số điện thoại</div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="mt-2">
            <InputWithLabel label={'Số điện thoại hiện tại'} disabled defaultValue={profileData?.Phone} />
            <InputWithLabel label={'Số điện thoại mới'} register={register} registerKey={'Phone'} />
          </div>

          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Xác nhận
          </button>
        </form>
      </Modal>
    </>
  );
};

export default StudentProfileHeader;
