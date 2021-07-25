import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, Button, message, Typography,
} from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

import userApi from '../../api/user';

import './style.less';

const LoginPage = () => {
  // router
  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  };

  const handleSubmit = async (values) => {
    const [, res] = await userApi.resetPwd(values);
    if (res) {
      message.success('重置成功，密码已通过邮件发送', 2);
      setTimeout(() => {
        goToLogin();
      }, 2000);
    }
  };

  return (
    <div className="page-login">
      <Form onFinish={handleSubmit} className="login-form">
        <div className="login-title">忘记密码，请重置</div>
        <Typography.Text type="secondary">
          输入正确的用户名和邮箱地址，我们会将重置后的密码通过邮件发送给您。
        </Typography.Text>
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
        <Form.Item name="remember" valuePropName="checked" initialValue>
          <Button type="primary" htmlType="submit" className="login-form-button">
            确认重置
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={goToLogin}>返回登录</Button>
    </div>
  );
};

export default LoginPage;
