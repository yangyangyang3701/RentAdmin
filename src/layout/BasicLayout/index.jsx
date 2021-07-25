import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';
// import MainFooter from "../MainFooter";

import './style.less';

const BasicLayout = ({ route, children }) => {
  const globalStore = useSelector((state) => state.global);
  const history = useHistory();

  useEffect(() => {
    document.title = globalStore.appTitle;
    if (!localStorage.getItem('token')) {
      history.replace('/login');
    }
  }, []);

  return (
    <Layout className="main-layout">
      <SiderMenu routes={route.childRoutes} />
      {/* 左侧菜单导航 */}
      <Layout className="main-layout-right">
        <MainHeader />
        <Layout.Content className="main-layout-content">
          {children}
          {/* <MainFooter></MainFooter> */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
