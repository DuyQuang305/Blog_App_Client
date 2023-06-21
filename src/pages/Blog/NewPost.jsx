import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import defaultAvatar from '../../assets/img/defaultAvt.png'
import FormNewPost from '../../components/FormNewPost';
import logo from '../../assets/img/Logo.svg'

import { Layout, theme, Dropdown, Avatar } from 'antd';
import { Content } from 'antd/es/layout/layout';
const { Header } = Layout;

const NewPost = () => {
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
            <Avatar src={currentUser.avatar || defaultAvatar} />
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

  return (
    currentUser && accessToken && (
    <Layout style={{ height: '100vh' }}>
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
              <div className="navbar__log" style={{marginLeft:'20px'}}>
                <Link to='/'>
                  <img src={logo} alt="logo" 
                        style={{width:'80px'}}    
                    />
                </Link>
              </div>
              <Dropdown
                menu={{ items, }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Avatar style={{ marginRight: '20px' }}
                  src={currentUser.avatar || defaultAvatar} />
              </Dropdown>
            </Header>
            <Content className='wrap__content'>
                <FormNewPost />
            </Content>
        </Layout>
    )
  )
}

export default NewPost