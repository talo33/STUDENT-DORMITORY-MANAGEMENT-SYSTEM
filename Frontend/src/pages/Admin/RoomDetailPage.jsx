import { useParams } from 'react-router-dom';
import ProfileCard from 'components/ProfileCard';
import { useQuery } from '@tanstack/react-query';
import { getRoom } from 'API/room';

export default function RoomDetailPage() {
  const { id } = useParams();

  const { data: roomDetail } = useQuery({
    queryKey: ['room_detail'],
    queryFn: () => getRoom(id)
  });

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">Phòng {roomDetail?.Title}</h2>
        <p className="my-2 text-lg leading-8 text-gray-600">Danh sách sinh viên</p>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {roomDetail &&
          roomDetail.roomMembers.map((person) => (
            <li
              key={person._id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <ProfileCard person={person} />
            </li>
          ))}
      </ul>
    </div>
  );
}
