import PriceTable from 'components/PriceTable';
import React from 'react';

const policy = [
  {
    content: 'Tiền hồ sơ: 60.000 đồng/sinh viên.'
  },
  {
    content: 'Tiền thế chân tài sản-cơ sở vật chất (TCTS-CSVC): 100.000 đồng/sinh viên.'
  },
  {
    content:
      'Tiền BHYT: 850.500 đồng/sinh viên/15 tháng (dành cho tân sinh viên đóng BHYT tại KTX); 680.400 đồng/ sinh viên/12 tháng (dành cho tân sinh viên trường Đại học Công nghệ Thông tin).'
  },
  {
    content: 'Bảo hiểm tai nạn: 30.000đ/sinh viên/12 tháng.'
  },
  {
    content:
      'Mức giá lệ phí phòng ở: Căn cứ Công văn số 1593/ĐHQG-KHTC ngày 09/8/2022 của ĐHQG-HCM về “Quy định mức giá lệ phí phòng ở KTX từ năm học 2022-2023 đến năm học 2025-2026 và đơn giá dịch vụ”, Trung tâm thông báo mức giá lệ phí phòng ở và đơn giá dịch vụ tăng thêm như sau'
  }
];

const note = [
  { id: 1, content: 'Mức đóng cho các loại phòng trên chưa bao gồm tiền sử dụng điện, nước và các dịch vụ khác.' },
  { id: 2, content: 'Sinh viên được nhận lại tiền TCTS-CSVC đã đóng khi rời khỏi KTX.' },
  { id: 3, content: 'Mức lệ phí phòng ở từ 01/9/2024-31/8/2026: Sinh viên xem chi tiết phụ lục IV' },
  {
    id: 4,
    content:
      'Loại phòng này sẽ được hiển thị trên phần mềm để sinh viên lựa chọn khi đăng ký. Sinh viên tìm hiểu kỹ thông tin và loại phòng trước khi đăng ký.'
  }
];

const PolicyRevenue = () => {
  return (
    <div className="w-1/2 bg-slate-200/70 rounded-xl border-2 border-solid p-8">
      <div>
        <h3 className="text-xl text-center font-bold w-full">CÁC KHOẢN THU VÀ MỨC THU</h3>
        <div className="text-start flex flex-col gap-2">
          <div>
            (Ban hành kèm theo Thông báo số 479/TB-TTQLKTX ngày 15 tháng 08 năm 2023 của Trung tâm Quản lý Ký túc xá)
          </div>
          {policy.map((data, index) => (
            <div key={data.content}>
              {index + 1}. {data.content}
            </div>
          ))}
        </div>
      </div>
      <PriceTable />
      <div className="mt-8">
        <div className="text-start flex flex-col gap-2">
          <div>Ghi chú:</div>
          {note.map((data) => (
            <div key={data.id}>- {data.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyRevenue;
