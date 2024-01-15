import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRequestCheckout, updateRequestCheckout } from 'API/requests';
import { getColorStatus } from 'DB';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import SectionHeaderWithSearch from 'components/SectionHeader/SectionHeaderWithSearch';
import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'utils/hook/useDebounce';
import ModalReason from './ModalReason';
import { GlobalContextProvider } from 'context/GlobalContext';

const CheckoutRequest = () => {
  const { profileData } = useContext(GlobalContextProvider);

  const {
    data: checkoutRequest,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: ['all_checkout'],
    queryFn: getAllRequestCheckout
  });

  const [dataQuery, setDataQuery] = useState([]);
  const [query, setQuery] = useState('');

  const [updateData, setUpdateData] = useState({});
  const [reason, setReason] = useState('');
  const [isOpenReason, setIsOpenReason] = useState(false);

  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    if (isSuccess && checkoutRequest) {
      setDataQuery(checkoutRequest);
    }
  }, [isSuccess, checkoutRequest]);

  useEffect(() => {
    if (checkoutRequest) {
      let updatedList = [...checkoutRequest];
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
      dataIndex: 'room?.roomTitle',
      align: 'center',
      render: (_, record) => {
        return record?.room?.roomTitle;
      }
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'userDetail.HoTen',
      render: (_, record) => {
        return record.userDetail.HoTen;
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
    mutationFn: updateRequestCheckout,
    onSuccess: () => {
      refetch();
    }
  });

  return (
    <div>
      <SectionHeaderWithSearch title={'Danh sách đơn trả phòng'} setQuery={setQuery} placeholder={'Tìm đơn'} />
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

export default CheckoutRequest;
