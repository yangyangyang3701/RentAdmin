import React, { useEffect, useState } from 'react';
import {
  Table, PageHeader, Button, Popconfirm, message,
} from 'antd';

import { useSelector } from 'react-redux';
import paymentApi from '../../api/payment';

import './style.less';

const Expire = () => {
  const globalStore = useSelector((store) => store.global);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const getList = async () => {
    setIsLoading(true);
    const [err, res] = await paymentApi.getList({
      payrecord: 2,
    });
    setIsLoading(false);
    if (!err && res) {
      console.log(res);
      setTableData(res.apartmentDetail || []);
    }
  };

  const handleEnd = (row) => async () => {
    const [err, res] = await paymentApi.end({
      RentalId: row.RentalId,
    });
    if (!err && res) {
      message.success('操作成功');
      getList();
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
      title: 'RentalId',
      dataIndex: 'RentalId',
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
      title: '租期开始时间',
      dataIndex: 'LatestRentalStartTime',
    },
    {
      title: '下一次交租日期',
      dataIndex: 'NextPayRentalTime',
      sorter: (dataA, dataB) => +new Date(dataA) - (+new Date(dataB)),
    },
    {
      title: '操作',
      dataIndex: '',
      width: 100,
      render: (row) => (
        <Popconfirm title="确定结束租期吗？" onConfirm={handleEnd(row)} okText="确定" cancelText="取消">
          <Button type="link">结束租期</Button>
        </Popconfirm>
      ),
      fixed: globalStore.isMobile ? 'right' : '',
    },
  ];

  return (
    <div className="payment">
      <PageHeader
        className="page_header"
        title="即将到期"
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

export default Expire;
