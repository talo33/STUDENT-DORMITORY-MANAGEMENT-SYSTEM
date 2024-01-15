import React from 'react';

const policy = [
  {
    title: 'Để đảm bảo thời gian đăng ký ở Ký túc xá trực tuyến, sinh viên chuẩn bị đầy đủ file hình sau:',
    id: 1,
    children: [
      {
        id: 1,
        isHtml: true,
        content:
          '- Chứng minh nhân dân/thẻ căn cước công dân (mặt trước và mặt sau), mã số định danh cá nhân, trường hợp chưa có mã số định danh.'
      },
      { id: 2, content: '- Thẻ Bảo hiểm Y tế.' },
      {
        id: 3,
        content:
          '- Đối với tân sinh viên: Giấy tờ minh chứng đã làm thủ tục nhập học tại CSĐT (theo phụ lục VII của Thông báo số 479/TB-TTQLKTX)(*).'
      },
      {
        id: 4,
        content: '- Đối với sinh viên năm 2 trở lên: Thẻ sinh viên/Giấy xác nhận sinh viên/thời khóa biểu học tập(*).'
      },
      { id: 5, content: '- Hình thẻ kích thước 4 x 6 (áo sơ mi, chụp rõ khuôn mặt).' }
    ]
  },
  {
    id: 2,
    title: 'Sinh viên tìm hiểu kỹ thông tin sau:',
    children: [
      { id: 1, content: '- Thời gian đăng ký tối đa 20 phút.' },
      { id: 2, content: '- Thời gian trả kết quả: trong 36 giờ tính từ khi hệ thống xác nhận đăng ký thành công.' }
    ]
  },
  {
    id: 3,
    title: 'Vui lòng đọc kỹ thông tin sau:',
    children: [
      {
        id: 1,
        content: '1. Thời gian ở KTX:',
        children: [
          { content: '- Thời gian bắt đầu: từ ngày sinh viên đăng ký ở KTX:' },
          {
            content:
              '- Thời gian kết thúc: Sinh viên lựa chọn một trong ba mốc thời gian sau theo kế hoạch học tập của cá nhân:',
            subContent: [
              { content: 'Ngày 30/6/2024' },
              { content: 'Ngày 31/7/2024' },
              { content: 'Ngày 31/8/2024 (Không dành cho sinh viên năm 4 trở lên)' }
            ]
          }
        ]
      },
      {
        id: 2,
        content:
          '2. Sinh viên đã ở KTX năm học 2022-2023 trở về trước, chưa thực hiện thủ tục thanh quyết toán tiền thế chân tài sản (TCTS) trước khi chuyển ra theo quy định: Liên hệ Ban Quản lý cụm nhà để hoàn tất thủ tục trước khi đăng ký ở KTX.'
      },
      {
        id: 3,
        content:
          '3. Sinh viên năm thứ 5 trở lên: Cung cấp giấy xác nhận sinh viên hoặc thời khóa biểu còn đang học tại cơ sở đào tạo. Sinh viên còn nợ chứng chỉ để tốt nghiệp, thực tập không được đăng ký ở KTX năm học 2023-2024.'
      },
      {
        id: 4,
        content:
          '4. Sinh viên đã từng vi phạm kỷ luật ở KTX với hình thức khiển trách, cảnh cáo: Nộp trực tiếp bản cam kết cho Ban Quản lý cụm nhà trước khi đăng ký ở KTX. Sinh viên tải mẫu cam kết tại địa chỉ: https://ktx.vnuhcm.edu.vn/bieu-mau/cac-bieu-mau-cua-ktx-danh-cho-sinh-vien-2.html. Sau khi sinh viên nộp bản cam kết, cổng đăng ký online mới mở.'
      },
      {
        id: 5,
        content:
          '5. Sau khi hoàn tất đăng ký, trong vòng 36 giờ, hệ thống sẽ gửi thông báo qua email của sinh viên. Sinh viên đăng nhập vào email đã đăng ký hoặc tài khoản cá nhân trên trang web: https://sv.ktxhcm.edu.vn/ hoặc App iDorm sv để thực hiện thanh toán online theo hướng dẫn.',
        children: [
          {
            content:
              '5.1 Trường hợp ĐƯỢC duyệt: sinh viên thực hiện thanh toán theo hướng dẫn và trong thời gian 5 ngày kể từ khi được duyệt.'
          },
          {
            content:
              '5.2 Trường hợp KHÔNG được duyệt: sinh viên liên hệ Hành chính toà nhà (nội dung đính kèm) và thực hiện theo hướng dẫn.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Tổng đài hỗ trợ: 1900.055.559',
    children: [
      { id: 1, content: '1. Phòng Công tác sinh viên: 105' },
      { id: 2, content: '2. Phòng Kế hoạch tài chính: 112' },
      {
        id: 3,
        content: '3. Ban quản lý các cụm nhà: AF: 120, AG: 121, AH: 122, BA: 123, BB: 124, BC: 125, BD: 126, BE: 127'
      }
    ]
  }
];

const PolicyStudentInfo = () => {
  return (
    <div className="w-1/2 bg-slate-200/70 rounded-xl border-2 border-solid p-8">
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-xl text-center font-bold w-full">
          THÔNG TIN SINH VIÊN ĐĂNG KÝ Ở KTX ĐHQG-HCM NH 2023-2024
        </h3>
        <div className="font-medium text-md">I. HƯỚNG DẪN ĐĂNG KÝ</div>

        {policy.map((data) => (
          <div key={data.id} className="mt-4">
            <div className="font-semibold">{data.title}</div>
            <div className="ml-8 flex flex-col gap-3 mt-2">
              {data?.children?.length &&
                data.children.map((children) => (
                  <div key={children.id}>
                    {children.content}
                    <div className="ml-8 flex flex-col gap-3 mt-2">
                      {children?.children?.length &&
                        children.children.map((item) => <div key={item.content}>{item.content}</div>)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyStudentInfo;
