import React, { useEffect, useState } from 'react';
import {
  Table, Button, Modal, message,
} from 'antd';
import FormRender, { useForm } from 'form-render';

import paymentApi from '../../api/payment';

import './style.less';

const Payment = () => {
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
      title: '最近交租日期',
      dataIndex: 'LatestRentalStartTime',
    },
    {
      title: '下一次交租日期',
      dataIndex: 'NextPayRentalTime',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => <Button onClick={() => handleAddRecord(row)} type="link">收租</Button>,
    },
  ];

  return (
    <div className="payment">
      <Table
        dataSource={tableData}
        loading={isLoading}
        columns={columns}
        rowKey="Id"
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
                  Months: {
                    title: '月份',
                    type: 'string',
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
                    required: true,
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
