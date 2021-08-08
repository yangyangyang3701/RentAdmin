import React, { useEffect, useState } from 'react';
import {
  Table, PageHeader, Button, message, Modal,
} from 'antd';
import FormRender, { useForm } from 'form-render';

import { useSelector } from 'react-redux';
import paymentApi from '../../api/payment';

import './style.less';

const NoRented = () => {
  const globalStore = useSelector((store) => store.global);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const form = useForm();

  const getList = async () => {
    setIsLoading(true);
    const [err, res] = await paymentApi.getList({
      payrecord: 3,
    });
    setIsLoading(false);
    if (!err && res) {
      console.log(res);
      setTableData(res.apartmentDetail || []);
    }
  };

  const handleSubmit = async (values) => {
    const [err, res] = await paymentApi.start({
      ...values,
    });
    setShowModal(false);
    if (!err && res) {
      message.success('出租成功');
      getList();
    }
  };

  const handleAddTenant = (row) => () => {
    row.ApartmentId = row.Id;
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
      render: (row) => <Button onClick={handleAddTenant(row)} type="link">出租</Button>,
      fixed: globalStore.isMobile ? 'right' : '',
    },
  ];

  return (
    <div className="payment">
      <PageHeader
        className="page_header"
        title="未出租"
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
      <Modal
        visible={showModal}
        title="出租信息登记"
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
                  ApartmentId: {
                    title: 'ApartmentId',
                    type: 'number',
                    required: true,
                    disabled: true,
                  },
                  StartDate: {
                    title: '开始日期',
                    type: 'string',
                    format: 'date',
                    required: true,
                  },
                  TenantName: {
                    title: '租户姓名',
                    type: 'string',
                    required: true,
                  },
                  TenantPhone: {
                    title: '租户手机号',
                    type: 'string',
                    rules: [
                      {
                        pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
                        message: '手机号格式不正确',
                      },
                    ],
                    required: true,
                  },
                  TenantIdCard: {
                    title: '租户身份证号',
                    type: 'string',
                    rules: [
                      {
                        pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
                        message: '身份证格式不正确',
                      },
                    ],
                    required: true,
                  },
                  PayPeriod: {
                    title: '支付方式',
                    type: 'string',
                    required: true,
                    enum: ['年', '季', '月'],
                    enumNames: ['按年', '按季', '按月'],
                  },
                  PeriodNum: {
                    title: '首付月数',
                    type: 'number',
                    required: true,
                  },
                  PeriodFee: {
                    title: '首付金额(元)',
                    type: 'number',
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

export default NoRented;
