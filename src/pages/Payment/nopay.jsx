import React, { useEffect, useState } from 'react';
import {
  Table, Button, Modal, message, PageHeader,
} from 'antd';
import FormRender, { useForm } from 'form-render';

import { useSelector } from 'react-redux';

import paymentApi from '../../api/payment';

import './style.less';

const Payment = () => {
  const globalStore = useSelector((store) => store.global);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const form = useForm();

  const getList = async () => {
    setIsLoading(true);
    const [err, res] = await paymentApi.getList({
      payrecord: 0,
    });
    setIsLoading(false);
    if (!err && res) {
      console.log(res);
      setTableData(res.apartmentDetail || []);
    }
  };

  const handleSubmit = async (values) => {
    const [err, res] = await paymentApi.create({
      ...values,
    });
    setShowModal(false);
    if (!err && res) {
      message.success('添加成功');
      getList();
    }
  };

  const handleAddRecord = (row) => {
    form?.setValues(row);
    setShowModal(true);
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
      width: 80,
      render: (row) => <Button onClick={() => handleAddRecord(row)} type="link">收租</Button>,
      fixed: globalStore.isMobile ? 'right' : '',
    },
  ];

  return (
    <div className="payment">
      <PageHeader
        className="page_header"
        title="未支付"
      />
      <Table
        className="table"
        dataSource={tableData}
        loading={isLoading}
        columns={columns}
        rowKey="Id"
        size={globalStore.isMobile ? 'small' : 'middle'}
        scroll={{
          x: globalStore.isMobile ? 800 : '',
        }}
      />
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form?.submit()}
      >
        {
          showModal && (
            <FormRender
              form={form}
              schema={{
                type: 'object',
                properties: {
                  RentalId: {
                    title: 'RentalId',
                    type: 'number',
                    required: true,
                    disabled: true,
                  },
                  MonthNum: {
                    title: '月数',
                    type: 'number',
                    required: true,
                  },
                  Amount: {
                    title: '金额',
                    type: 'number',
                    required: true,
                  },
                  Remark: {
                    title: '备注',
                    type: 'string',
                    required: false,
                  },
                },
              }}
              onFinish={handleSubmit}
            />
          )
        }
      </Modal>
    </div>
  );
};

export default Payment;
