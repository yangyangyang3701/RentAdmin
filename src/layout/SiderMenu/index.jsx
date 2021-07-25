import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Row } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

import './style.less';

const renderMenuItem = (target) => target
  .filter((item) => item.path && item.name && item.isMenu)
  .map((subMenu) => {
    if (subMenu.childRoutes && !!subMenu.childRoutes.find((child) => child.path && child.name)) {
      return (
          <Menu.SubMenu
            key={subMenu.path}
            title={
              <div>
                {!!subMenu.icon && subMenu.icon}
                <span>{subMenu.name}</span>
              </div>
            }
          >
            {renderMenuItem(subMenu.childRoutes)}
          </Menu.SubMenu>
      );
    }
    return (
        <Menu.Item key={subMenu.path}>
          <Link to={subMenu.path}>
            <span>
              {!!subMenu.icon && subMenu.icon}
              <span>{subMenu.name}</span>
            </span>
          </Link>
        </Menu.Item>
    );
  });

const SiderMenu = ({ routes }) => {
  const { pathname } = useLocation();
  const globalStore = useSelector((state) => state.global);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const list = pathname.split('/').splice(1);
    setOpenKeys(list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`));
  }, []);

  const getSelectedKeys = useMemo(() => {
    const list = pathname.split('/').splice(1);
    return list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`);
  }, [pathname]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Layout.Sider trigger={null} collapsible collapsed={globalStore.collapsed} className="main-left-slider">
      <Link to="/">
        <Row type="flex" align="middle" className="main-logo">
          <HomeOutlined />
          {!globalStore.collapsed && <span style={{ paddingLeft: '16px' }}>{globalStore.appTitle}</span>}
        </Row>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingLeft: 0, marginBottom: 0 }}
        className="main-menu"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={getSelectedKeys}
      >
        {renderMenuItem(routes)}
      </Menu>
    </Layout.Sider>
  );
};

export default SiderMenu;
