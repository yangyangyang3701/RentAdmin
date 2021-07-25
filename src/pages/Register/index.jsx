import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, Button, message,
} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ReactSimpleVerify from 'react-simple-verify';

import userApi from '../../api/user';

import './style.less';

const LoginPage = () => {
  // router
  const history = useHistory();
  // store
  const globalStore = useSelector((state) => state.global);
  // ref
  const verifyRef = useRef();
  const formRef = useRef();
  // state
  const [verified, setVerified] = useState(false);

  const goToLogin = () => {
    history.push('/login');
  };

  const handleSubmit = async (values) => {
    if (!verified) {
      message.error('请先滑动滑块认证');
      return;
    }
    const [, res] = await userApi.register(values);
    if (res) {
      message.success('注册成功，即将跳转登录页面', 2);
      setTimeout(() => {
        goToLogin();
      }, 2000);
    }
  };

  const handleVerifySuccess = () => {
    setVerified(true);
  };

  const handleCheckedPwd = (rules, value, callback) => {
    const pwd = formRef.current?.getFieldValue('pwd');
    if (pwd && pwd !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  };

  return (
    <div className="page-login">
      <Form
        name="registerForm"
        ref={formRef}
        onFinish={handleSubmit}
        initialValues={{}}
        className="login-form"
      >
        <div className="login-title">欢迎注册 {globalStore.appTitle}</div>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱地址！' },
            { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确' },
          ]}
        >
          <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item name="pwd" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
          name="pwd2"
          rules={[
            { required: true, message: '请重新输入密码！' },
            { validator: handleCheckedPwd },
          ]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="重新输入"
          />
        </Form.Item>
        <Form.Item name="verify">
          <ReactSimpleVerify ref={verifyRef} success={handleVerifySuccess} />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={goToLogin}>已有账号？去登录</Button>
    </div>
  );
};

export default LoginPage;
