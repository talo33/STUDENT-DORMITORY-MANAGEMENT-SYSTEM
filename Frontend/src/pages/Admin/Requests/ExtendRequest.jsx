import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRequestExtendChange, updateRequestExtendRoom } from 'API/requests';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import SectionHeaderWithSearch from 'components/SectionHeader/SectionHeaderWithSearch';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'utils/hook/useDebounce';
import ModalReason from './ModalReason';
import { GlobalContextProvider } from 'context/GlobalContext';
import { getColorStatus } from 'utils/shared';

const ExtendRequest = () => {
  const { profileData } = useContext(GlobalContextProvider);

  const { data: extendRequest, refetch } = useQuery({
    queryKey: ['all_extend'],
    queryFn: getAllRequestExtendChange
  });

  const [dataQuery, setDataQuery] = useState([]);
  const [query, setQuery] = useState('');

  const [updateData, setUpdateData] = useState({});
  const [reason, setReason] = useState('');
  const [isOpenReason, setIsOpenReason] = useState(false);

  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    extendRequest && setDataQuery(extendRequest);
  }, [extendRequest]);

  useEffect(() => {
    if (extendRequest) {
      let updatedList = [...extendRequest];
      updatedList = updatedList?.filter((item) => {
        return item?._id.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      setDataQuery(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const getStatus = (statusId) => {
    switch (statusId) {
      case 0:
        return 'Chưa duyệt';
      case 1:
        return 'Đã duyệt';
      case 2:
        return 'Đã từ chối';
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Phòng',
      dataIndex: 'roomTitle',
      align: 'center'
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'userDetail.HoTen',
      render: (_, record) => {
        return record.userDetail.HoTen;
      }
    },
    {
      title: 'Hạn cuối',
      dataIndex: 'dateOut',
      render: (_, record) => {
        return moment(record?.dateOut).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Ngày muốn gia hạn',
      dataIndex: 'newDateOut',
      render: (_, record) => {
        return moment(record?.newDateOut).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return <div className={`${getColorStatus(record?.requestStatus)}`}>{getStatus(record.requestStatus)}</div>;
      }
    },
    {
      title: 'Tác vụ',
      key: 'action',
      render: (_, record) => {
        return (
          record.requestStatus === 0 && (
            <div className="flex gap-3 items-center">
              <PrimaryButton text={'Duyệt'} onClick={() => updateRequest(record._id, record.userId, 1)} />
              <PrimaryButton
                text={'Từ chối'}
                className={'!bg-red-500 !hover:bg-red-400'}
                onClick={() => {
                  setIsOpenReason(true);
                  setUpdateData(record);
                }}
              />
            </div>
          )
        );
      }
    }
  ];

  const updateRequest = (id, userId, requestStatus) => {
    return handleUpdateRequest.mutate({
      id,
      data: {
        userId,
        requestStatus,
        rejectReason: reason,
        updatedBy: profileData?.HoTen
      }
    });
  };

  const handleUpdateRequest = useMutation({
    mutationFn: updateRequestExtendRoom,
    onSuccess: () => {
      refetch();
    }
  });

  return (
    <div>
      <SectionHeaderWithSearch title={'Danh sách đơn gia hạn'} setQuery={setQuery} placeholder={'Tìm đơn'} />
      <CustomTable dataSource={dataQuery} columns={columns} isPagination={false} />
      <ModalReason
        isOpen={isOpenReason}
        setIsOpen={setIsOpenReason}
        handleReject={() => updateRequest(updateData?._id, updateData?.userId, 2)}
        setReason={setReason}
      />
    </div>
  );
};

export default ExtendRequest;
