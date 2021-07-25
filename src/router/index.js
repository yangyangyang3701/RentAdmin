import {
  HomeOutlined, WarningOutlined, FrownOutlined,
  BankOutlined,
} from '@ant-design/icons';
import React, { lazy } from 'react';

import BasicLayout from '../layout/BasicLayout';
import BlankLayout from '../layout/BlankLayout';

const config = [
  {
    path: '/',
    component: BlankLayout,
    childRoutes: [
      {
        path: '/login',
        name: '登录页',
        component: lazy(() => import('../pages/Login')),
      },
      {
        path: '/register',
        name: '注册页',
        component: lazy(() => import('../pages/Register')),
      },
      {
        path: '/forgetpwd',
        name: '忘记密码页',
        component: lazy(() => import('../pages/ForgetPwd')),
      },
      {
        path: '/',
        component: BasicLayout,
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            icon: <HomeOutlined />,
            component: lazy(() => import('../pages/Welcome')),
          },
          {
            path: '/payment',
            name: '支付管理',
            icon: <BankOutlined />,
            isMenu: true,
            childRoutes: [
              {
                path: '/payment/payed',
                name: '已支付',
                isMenu: true,
                component: lazy(() => import('../pages/Payment/payed')),
              },
              {
                path: '/payment/nopay',
                name: '未支付',
                isMenu: true,
                component: lazy(() => import('../pages/Payment/nopay')),
              },
            ],
          },
          {
            path: '/exception',
            name: '异常页',
            // exact: true,
            icon: <WarningOutlined />,
            childRoutes: [
              {
                path: '/exception/403',
                name: '403',
                icon: <FrownOutlined />,
                component: lazy(() => import('../pages/Exception/NoPermissions')),
              },
              {
                path: '/exception/404',
                name: '404',
                exact: true,
                icon: <FrownOutlined />,
                component: lazy(() => import('../pages/Exception/NotFound')),
              },
              {
                path: '/exception/500',
                name: '500',
                icon: <FrownOutlined />,
                component: lazy(() => import('../pages/Exception/ServerError')),
              },
            ],
          },
          { path: '/', exact: true, redirect: '/welcome' },
          { path: '*', exact: true, redirect: '/exception/not-found' },
        ],
      },
    ],
  },
];

export default config;
