import { UsersIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { deleteRoom, getAllRooms, getDormitory } from 'API/room';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { DeleteButton } from 'components/Button/DeleteButton';
import { Modal } from 'antd';
import WarningIcon from 'components/icons/Warning';
import { toast } from 'react-toastify';
import { GlobalContextProvider } from 'context/GlobalContext';
import SectionHeaderWithSearch from 'components/SectionHeader/SectionHeaderWithSearch';
import { useDebounce } from 'utils/hook/useDebounce';

export default function RoomList() {
  const queryClient = useQueryClient();
  const { profileData } = useContext(GlobalContextProvider);

  const { data: dormDataReturned } = useQuery({
    queryKey: ['all_dorms'],
    queryFn: getDormitory
  });

  const { data: roomsData } = useQuery({
    queryKey: ['all_rooms'],
    queryFn: getAllRooms
  });

  const [dormData, setDormData] = useState([]);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(false);

  const [dormDataQuery, setDormDataQuery] = useState([]);
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    if (dormDataReturned && roomsData) {
      const updatedDormData = dormDataReturned?.map((dorm) => {
        const roomIds = dorm.Room || [];
        const roomsInDorm = roomsData.filter((room) => roomIds.includes(room?._id));
        return { ...dorm, Room: roomsInDorm };
      });

      setDormData(updatedDormData);
    }
  }, [dormDataReturned, roomsData]);

  useEffect(() => {
    setDormDataQuery(dormData);
  }, [dormData]);

  useEffect(() => {
    if (dormData) {
      let updatedList = dormData.map((dorm) => {
        let filteredRooms = dorm.Room.filter((room) => room.Title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        return {
          ...dorm,
          Room: filteredRooms
        };
      });
      updatedList = updatedList.filter((dorm) => dorm.Room.length > 0); // Lọc các dorm có ít nhất một phòng thỏa mãn điều kiện
      setDormDataQuery(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleOpenDeleteModal = (room, dormId) => {
    setIsModalDelete(true);
    setSelectedRoom({
      title: room?.Title,
      dormId,
      roomId: room?._id
    });
  };

  const deleteSelectedRoom = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success('Xóa thành công');
      queryClient.invalidateQueries({ queryKey: ['all_rooms'] });
      queryClient.invalidateQueries({ queryKey: ['all_dorms'] });
      setIsModalDelete(false);
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const handleDeleteRoom = () => {
    deleteSelectedRoom.mutate({
      id: selectedRoom?.roomId,
      dormitoryId: selectedRoom?.dormId,
      CMND: profileData?.CMND
    });
  };
  return (
    <>
      <SectionHeaderWithSearch title={'Danh sách phòng'} placeholder={'Tìm phòng'} setQuery={setQuery} />

      <ul className="divide-y divide-gray-100">
        {dormDataQuery?.map((dorm) => (
          <div key={dorm._id} className="border-b border-gray-200 pb-5">
            <div className="text-lg font-semibold mt-3">{dorm.Name}</div>
            {dorm.Room?.length &&
              dorm.Room?.map((room) => (
                <li
                  key={room?._id}
                  className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
                >
                  <div>
                    <p className="text-md font-semibold leading-6 text-gray-900">
                      <Link to={`/admin/room/${room?._id}`} className="hover:underline">
                        Phòng {room?.Title}
                      </Link>
                    </p>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p>
                        <time dateTime={room?.createdAt}>
                          {moment(room?.createdAt).add(1, 'y').format('DD/MM/YYYY')}
                        </time>
                      </p>
                    </div>
                  </div>
                  <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                    <div className="flex -space-x-0.5">
                      <dt className="sr-only">Commenters</dt>
                      {room?.commenters?.map((commenter) => (
                        <dd key={commenter.id}>
                          <img
                            className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                            src={commenter.imageUrl}
                            alt={commenter.name}
                          />
                        </dd>
                      ))}
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="flex w-16 gap-x-2.5">
                        <dt>
                          <span className="sr-only">Total comments</span>
                          <UsersIcon
                            className={`h-6 w-6 text-gray-400 ${
                              room?.availableSlot <= 0 ? 'text-red-500' : 'text-green-500'
                            }`}
                            aria-hidden="true"
                          />
                        </dt>
                        <dd
                          className={`text-sm leading-6 text-gray-900 ${
                            room?.availableSlot <= 0 ? 'text-red-500' : 'text-green-500'
                          }`}
                        >
                          {`${room?.Slot - room?.availableSlot}/${room?.Slot}`}
                        </dd>
                      </div>
                      <div>
                        <DeleteButton text={'Xóa'} onClick={() => handleOpenDeleteModal(room, dorm?._id)} />
                      </div>
                    </div>
                  </dl>
                </li>
              ))}
          </div>
        ))}
      </ul>

      <Modal open={isModalDelete} onCancel={() => setIsModalDelete(false)} footer={false}>
        <div className="flex justify-center flex-col gap-3">
          <div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="text-xl font-semibold leading-6 text-gray-900">Xóa phòng</div>
              <div className="w-full mt-4 flex justify-center">
                <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <WarningIcon className="h-28 w-28" />
                </div>
              </div>
              <div className="mt-4 text-center text-base text-black">
                Bạn chắc chắn muốn xóa <span className="font-semibold">{selectedRoom?.Title}</span>?
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
              disabled:bg-red-200 disabled:hover:bg-red-200"
              onClick={() => handleDeleteRoom()}
            >
              Xác nhận
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setIsModalDelete(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
