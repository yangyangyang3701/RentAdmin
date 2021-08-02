import React, { useEffect, useState } from 'react';
import { Table, PageHeader } from 'antd';

import { useSelector } from 'react-redux';
import paymentApi from '../../api/payment';

import './style.less';

const Payment = () => {
  const globalStore = useSelector((store) => store.global);
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
      <PageHeader
        className="page_header"
        title="已支付"
      />
      <Table
        dataSource={tableData}
        loading={isLoading}
        columns={columns}
        rowKey="Id"
        size={globalStore.isMobile ? 'small' : 'middle'}
        scroll={{
          x: globalStore.isMobile ? 800 : '',
        }}
      />
    </div>
  );
};

export default Payment;
