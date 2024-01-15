import React from 'react';

const roomPrice = [
  {
    STT: 1,
    roomType: 'Phòng 2 sinh viên có máy lạnh',
    oldRoomPrice: 925000,
    oldServicePrice: 420000,
    roomPrice: 1250000,
    servicePrice: 420000
  },
  {
    STT: 2,
    roomType: 'Phòng 4 sinh viên',
    oldRoomPrice: 500000,
    oldServicePrice: 0,
    roomPrice: 500000,
    servicePrice: 0
  },
  {
    STT: 3,
    roomType: 'Phòng 6 sinh viên',
    oldRoomPrice: 215000,
    oldServicePrice: 0,
    roomPrice: 240000,
    servicePrice: 0
  }
];

const tableHeaders = [
  { content: 'Đơn giá phòng ở/sinh viên/tháng' },
  { content: 'Đơn giá dịch vụ tăng thêm/sinh viên/tháng' },
  { content: 'Tổng đơn giá' },
  { content: 'Đơn giá phòng ở/sinh viên/tháng' },
  { content: 'Đơn giá dịch vụ tăng thêm/sinh viên/tháng' },
  { content: 'Tổng đơn giá' }
];
const PriceTable = () => {
  const formatPrice = (data) => {
    if (data === 0) {
      return '-';
    }
    return data.toLocaleString();
  };
  return (
    <>
      <h3 className="mt-6 w-full text-center text-lg font-bold">
        Đơn giá từ 01/8/2023-31/8/2023 và đơn giá từ 01/9/2023-31/8/2024:
      </h3>
      <div className="w-full text-end">(Đơn giá tính: đồng)</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" rowSpan="2">
              STT
            </th>
            <th scope="col" rowSpan="2">
              Loại phòng
            </th>
            <th scope="col" colSpan="3" className="text-center">
              Từ 01/8/2023 -31/8/2023{' '}
            </th>
            <th scope="col" colSpan="3" className="text-center">
              Từ 01/9/2023 - 31/8/2024{' '}
            </th>
          </tr>
          <tr className="border">
            {tableHeaders.map((data, index) => (
              <th key={index + data.content}>{data.content}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <th></th>
            <td></td>
            <td>1</td>
            <td>2</td>
            <td>3=1+2</td>
            <td>4</td>
            <td>5</td>
            <td>6=4+5</td>
          </tr>
          {roomPrice.map((data) => (
            <tr key={data.STT}>
              <th>{data.STT}</th>
              <td className="text-start p-2">{data.roomType}</td>
              <td>{formatPrice(data.oldRoomPrice)}</td>
              <td>{formatPrice(data.oldServicePrice)}</td>
              <td>{formatPrice(data.oldRoomPrice + data.oldServicePrice)}</td>
              <td>{formatPrice(data.roomPrice)}</td>
              <td>{formatPrice(data.servicePrice)}</td>
              <td>{formatPrice(data.roomPrice + data.servicePrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PriceTable;
