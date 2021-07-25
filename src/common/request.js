import axios from 'axios';
import { message } from 'antd';

const httpQueue = []; // 请求队列

const request = axios.create({
  timeout: 5000,
  baseURL: '/api',
});

request.interceptors.request.use((req) => {
  // 加入token
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = token;
  }
  httpQueue.push(req);

  return req;
});

request.interceptors.response.use(async (res) => {
  console.log(res);
  const { status, data } = res;
  if (status >= 400) {
    message.error('系统错误');
  }

  if (status >= 200 && status < 400) {
    if (data.code === 0) { // 成功
      httpQueue.shift();
      return [null, res.data];
    }

    switch (data.code) {
      case -1:
        message.error('登录过期，请重新登录！');
        localStorage.clear();
        window.location.replace('/#/login');
        break;
      case -2:
        message.error('你没有该权限！');
        break;
      case -3:
        message.error('内容查找为空！');
        break;
      case 2:
        message.error('用户名或密码错误！');
        break;
      case 3:
        message.error('请先通过邮件认证账号！');
        break;
      case 4:
        message.error('邮箱已经被注册！');
        break;
      case 5:
        message.error('用户名已存在！');
        break;
      case 6:
        message.error('用户名不存在！');
        break;
      case 7:
        message.error('用户名或密码错误！');
        break;
      case 8:
        message.error('重置密码失败！');
        break;
      case 9:
        message.error('重置密码失败！');
        break;
      default:
        break;
    }
  }
  httpQueue.shift();
  return [res.data, null];
}, (error) => {
  if (error.message.includes('timeout')) {
    message.error('服务响应超时');
  }
  return [error, null];
});

export default request;
