import React from 'react';
import { Layout } from 'antd';

import { useSelector } from 'react-redux';

import Menus from '../Menus';

import './style.less';

const SiderMenu = ({ routes }) => {
  const globalStore = useSelector((state) => state.global);

  return (
    <Layout.Sider trigger={null} collapsible collapsed={globalStore.collapsed} className="main-left-slider">
      <Menus routes={routes} />
    </Layout.Sider>
  );
};

export default SiderMenu;
