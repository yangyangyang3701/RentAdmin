import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import paymentApi from '../../api/payment';

import './style.less';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const getList = async () => {
    const [err, res] = await paymentApi.getList({
      payrecord: 1,
    });
    setIsLoading(false);
    if (!err && res) {
      console.log(res);
      setTableData(res.apartmentDetail || []);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
    },
    {
      title: '房间',
      dataIndex: 'Name',
    },
    {
      title: '租户姓名',
      dataIndex: 'TanentName',
    },
    {
      title: '最近交租日期',
      dataIndex: 'LatestRentalStartTime',
    },
    {
      title: '下一次交租日期',
      dataIndex: 'NextPayRentalTime',
    },
  ];

  return (
    <div>
      <Table
        dataSource={tableData}
        loading={isLoading}
        columns={columns}
        rowKey="Id"
      />
    </div>
  );
};

export default Payment;
