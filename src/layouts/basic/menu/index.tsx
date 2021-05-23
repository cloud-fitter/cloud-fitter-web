import React, { useState } from 'react';
import { history } from 'umi';
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { menuList } from '@/assets/appConfig';
import styles from './index.less';

const { Sider } = Layout;

interface BasicMenuProps {
  path: string;
}

const BasicMenu: React.FC<BasicMenuProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e: any) => {
    let path = e.key;
    history.push(`/${path}`);
  };

  // 默认选中菜单
  let selectedKeys = '';
  for (const menu of menuList) {
    if (props.path.indexOf(menu.key) > 0) {
      selectedKeys = menu.key;
    }
  }

  return (
    <Sider collapsed={collapsed} className={styles.basicMenu}>
      <div className={styles.basicMenuBg} />
      <div className={styles.basicMenuContent}>
        <div className={styles.basicMenuLogo} onClick={onCollapse}>
          {!collapsed && (
            <span>
              导航列表 <MenuFoldOutlined />
            </span>
          )}
          {collapsed && <MenuUnfoldOutlined />}
        </div>
        <Menu
          onClick={handleClick}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#a8beff',
          }}
          selectedKeys={[selectedKeys]}
          mode="inline"
        >
          {menuList.map((menuItem) => (
            <Menu.Item
              key={menuItem.key}
              icon={<i className={`iconfont ${menuItem.icon}`} />}
            >
              <span>{menuItem.title}</span>
              <span style={{ float: 'right' }}>
                <RightOutlined />
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Sider>
  );
};

export default BasicMenu;
