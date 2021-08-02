import React, { useEffect } from 'react';
import { Layout, Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';
import Menus from '../Menus';
// import MainFooter from "../MainFooter";

import { toggleShowMobileMenu } from '../../store/global';

import './style.less';

const BasicLayout = ({ route, children }) => {
  const dispatch = useDispatch();
  const globalStore = useSelector((state) => state.global);
  const history = useHistory();

  useEffect(() => {
    document.title = globalStore.appTitle;
    if (!localStorage.getItem('token')) {
      history.replace('/login');
    }
  }, []);

  const handleCloseDrawer = () => {
    dispatch(toggleShowMobileMenu());
  };

  return (
    <Layout className="main-layout">
      {
        globalStore.isMobile ? (
          <Drawer
            className="drawer_menu"
            closable={false}
            width={200}
            placement="left"
            visible={globalStore.showMobileMenu}
            onClose={handleCloseDrawer}
            bodyStyle={{
              padding: 0,
            }}
          >
            <Menus routes={route.childRoutes} />
          </Drawer>
        ) : (
          <SiderMenu routes={route.childRoutes} />
        )
      }
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
