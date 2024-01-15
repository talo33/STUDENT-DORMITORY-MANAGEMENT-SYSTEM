'use client';

import './style.css';
import React from 'react';

import { Empty, Pagination, Table } from 'antd';

const CustomTable = ({
  dataSource = [],
  columns,
  isPaginationBacked = true,
  isPagination = true,
  paginationData,
  loading = false,
  onChangePagination,
  ...otherTable
}) => {
  return (
    <div className="">
      <Table
        rowKey={'_id'}
        className="custom-table"
        bordered
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        size="small"
        scroll={otherTable?.scroll ? otherTable?.scroll : { x: 'max-content', y: 380 }}
        locale={{
          emptyText: <Empty description="Chưa có dữ liệu" />
        }}
        pagination={
          isPaginationBacked || !isPagination
            ? false
            : { showSizeChanger: true, locale: { items_per_page: '' }, pageSizeOptions: [10, 20, 50] }
        }
        {...otherTable}
      />
      {isPaginationBacked && dataSource?.length > 0 && isPagination ? (
        <Pagination
          disabled={loading}
          className="mt-3 d-flex justify-content-end"
          // pageSize={paginationData?.item_page ?? 10}
          total={paginationData?.numPage * 10 ?? 0}
          current={paginationData?.currentPage ?? 1}
          showSizeChanger
          locale={{ items_per_page: '' }}
          onChange={onChangePagination}
          pageSizeOptions={[10, 20, 50]}
          size="small"
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default React.memo(CustomTable);
