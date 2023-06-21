import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
  HomeOutlined,
  ProfileOutlined,
  PlusCircleOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const SiderComponent = (collapsed) => {
  const navigate = useNavigate();

  function handleItemClick(item) {
    navigate(item.url)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed.collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: '1',
            icon: <PlusCircleOutlined />,
            label: 'Viết blog',
            onClick: () => handleItemClick({ url: '/new-post' }),
          },
          {
            key: '2',
            icon: <ProfileOutlined />,
            label: 'Hồ sơ',
            onClick: () => handleItemClick({ url: '/profile' }),
          },
          {
            key: '3',
            icon: <HomeOutlined />,
            label: 'Trang chủ',
            onClick: () => handleItemClick({ url: '/' }),
          },
          {
            key: '4',
            icon: <FileDoneOutlined />,
            label: 'Blog',
            onClick: () => handleItemClick({ url: '/blog' }),
          }
        ]}
      />
    </Sider>
  )
}

export default SiderComponent