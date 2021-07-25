import React, { useState } from 'react';
import {
  Layout, Dropdown, Menu, Row, Col, Modal, message,
} from 'antd';
import FormRender, { useForm } from 'form-render';
import {
  LockOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggleCollapsed } from '../../store/global';
import userApi from '../../api/user';

import './style.less';

const MainHeader = () => {
  const history = useHistory();
  const globalStore = useSelector((state) => state.global);
  const dispatch = useDispatch();
  // state
  const [showModal, setShowModal] = useState(false);

  const form = useForm();

  const handleSubmit = async (values) => {
    if (values.newpwd === values.oldpwd) {
      message.error('新旧密码不能一样');
      return;
    }
    const [err, res] = await userApi.setPwd({
      ...values,
      username: globalStore.userInfo?.loginName,
    });
    if (!err && res) {
      message.success('密码修改成功，请重新登录！');
      setShowModal(false);
    }
  };

  const logout = () => {
    userApi.logout();
    localStorage.clear();
    history.replace('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => setShowModal(true)}>
        <LockOutlined />
        &nbsp; 修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={logout}>
        <Link to="/login">
          <LogoutOutlined />
          &nbsp; 退出登录
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          <span className="trigger" onClick={() => dispatch(toggleCollapsed())}>
            {globalStore.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className="user-info">
              <span className="user-name">{globalStore.userInfo?.loginName}</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
      <Modal
        title="修改密码"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
      >
        {
          showModal && (
            <FormRender
              form={form}
              onFinish={handleSubmit}
              schema={{
                type: 'object',
                properties: {
                  oldpwd: {
                    title: '旧密码',
                    type: 'string',
                    required: true,
                  },
                  newpwd: {
                    title: '新密码',
                    type: 'string',
                    required: true,
                  },
                },
              }}
            />
          )
        }
      </Modal>
    </Layout.Header>
  );
};

export default MainHeader;
