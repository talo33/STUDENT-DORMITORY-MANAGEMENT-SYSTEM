import { Modal } from 'antd';
import TextAreaField from 'components/Input/AreaWithLabel';
import React from 'react';

const ModalReason = ({ isOpen, setIsOpen, handleReject, setReason }) => {
  return (
    <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={false}>
      <div className="flex flex-col gap-3">
        <div className="text-xl text-center w-full">Xác nhận từ chối</div>
        <div>
          <TextAreaField label={'Lý do từ chối'} className={'w-full'} rows={3} setState={setReason} />
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
              disabled:bg-red-200 disabled:hover:bg-red-200"
            onClick={handleReject}
          >
            Xác nhận
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setIsOpen(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReason;
