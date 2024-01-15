import React, { useContext, useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import InputWithLabel from 'components/Input/InputWithLabel';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addRoom, getDormitory } from 'API/room';
import { toast } from 'react-toastify';
import { GlobalContextProvider } from 'context/GlobalContext';

const RoomForm = () => {
  const { profileData } = useContext(GlobalContextProvider);
  const [floor, setFloor] = useState('1');
  const [dorm, setDorm] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { data: allDorms } = useQuery({
    queryKey: ['all_dorms'],
    queryFn: getDormitory
  });

  const getFloor = (floor) => {
    setDorm(floor);
    switch (floor.Name) {
      case 'Tầng 1':
        setFloor('1');
        break;
      case 'Tầng 2':
        setFloor('2');
        break;
      case 'Tầng 3':
        setFloor('3');
        break;
      case 'Tầng 4':
        setFloor('4');
        break;
      default:
        setFloor('1');
        break;
    }
  };

  const createRoom = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      toast.success('Thêm thành công');
      reset();
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const onSubmit = (data) => {
    createRoom.mutate({
      id: dorm?._id,
      data: {
        ...data,
        CMND: profileData?.CMND,
        St: 'Thu Duc',
        Photos: [],
        RoomNumbers: [],
        Floor: floor,
        status: 0
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Thêm phòng</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputWithLabel label="Tên phòng" register={register} registerKey={'Title'} />
            </div>

            <div className="col-span-3">
              <InputWithLabel label="Giá phòng" register={register} registerKey="Price" />
            </div>

            <div className="col-span-3">
              <label>Loại phòng</label>
              <select
                // {...register('type')}
                // disabled={isStudent}
                className={`custom_select_field w-full !max-w-full disabled:bg-slate-100/70 disabled:cursor-not-allowed`}
                {...register('Slot')}
              >
                <option>2</option>
                <option>4</option>
                <option>6</option>
              </select>
            </div>

            <div className="col-span-3">
              <label>Tầng</label>
              <select
                // {...register('type')}
                // disabled={isStudent}
                className={`custom_select_field w-full !max-w-full disabled:bg-slate-100/70 disabled:cursor-not-allowed`}
                onClick={(e) => getFloor(JSON.parse(e.target.value))}
              >
                {allDorms?.map((dorm) => (
                  <option key={dorm?._id} value={JSON.stringify(dorm)}>
                    {dorm?.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Thêm
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
