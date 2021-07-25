import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, Button, message, Row, Col,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import userApi from '../../api/user';
import { setUserInfo } from '../../store/global';

import './style.less';

const LoginPage = () => {
  // router
  const history = useHistory();
  // store
  const globalStore = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const [, res] = await userApi.login(values);
    if (res) {
      message.success('登录成功，即将跳转...', 2);
      const { token } = res;
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify({
        loginName: values.username,
      }));
      dispatch(setUserInfo({
        loginName: values.username,
      }));
      setTimeout(() => {
        history.push('/');
      }, 2000);
    }
  };

  const goToRegister = () => {
    history.push('/register');
  };

  const goToForgetPwd = () => {
    history.push('/forgetpwd');
  };

  return (
    <div className="page-login">
      <Form onFinish={handleSubmit} className="login-form">
        <div className="login-title">欢迎登录 {globalStore.appTitle}</div>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="pwd" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" initialValue>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col>
          <Button type="link" onClick={goToRegister}>没有账号？去注册</Button>
        </Col>
        <Col>
          <Button type="link" onClick={goToForgetPwd}>忘记密码</Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
