import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import SiderComponent from '../../components/SiderComponent';
import SearchComponent from '../../components/SearchComponent';
import FooterComponent from '../../components/FooterComponent';
import ContentBlog from '../../components/ContentBlog';
import defaultAvatar from '../../assets/img/defaultAvt.png'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme, Dropdown, Avatar } from 'antd';
const apiUrl = process.env.REACT_APP_SERVER_URL;
const { Header } = Layout;

const Blog = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState([])
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem('blog-app-accessToken')) {
        navigate('/login')
      } else {
        const accessToken = await JSON.parse(localStorage.getItem('blog-app-accessToken'))
        setAccessToken(accessToken)
      }
    }

    getCurrentUser()
  }, [navigate])

  useEffect(() => {
    if (accessToken) {
      const user = jwt_decode(accessToken)
      setCurrentUser(user)
    }
  }, [accessToken])

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  }

  const items = [
    {
      key: '1',
      label: (
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}
          className="info-user">
          <Avatar src={`${apiUrl}/${currentUser.avatar}` || defaultAvatar} />
          <h4 style={{ marginLeft: '6px' }}>{currentUser.fullname}</h4>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Link to='/profile'>Hồ sơ</Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to='/blog'>Viết Blog</Link>
      ),
    },
    {
      key: '4',
      label: (
        <span onClick={handleLogout}>Đăng xuất</span>
      ),
    },
  ];

  return (currentUser && accessToken &&
    (
      <div className="app-container">
        <Layout style={{ height: '100vh' }}>
          <SiderComponent collapsed={collapsed} style={{ height: '100vh' }} />
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                right: 0,
                zIndex: 20
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
               
               <SearchComponent />

              <Dropdown
                menu={{ items, }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Avatar style={{ marginRight: '20px' }}
                  src={`${apiUrl}/${currentUser.avatar}` || defaultAvatar} />
              </Dropdown>
            </Header>
            <ContentBlog currentUser={currentUser} />
            {/* <Footer
              style={{
                textAlign: 'center', 
                borderTop: '1px solid #ccc',
                marginTop: '20px',
                backgroundColor: '#f5f5f5'
              }}
            >
              <FooterComponent />
            </Footer> */}
          </Layout>
        </Layout>
      </div>
    )
  );
};
export default Blog;
