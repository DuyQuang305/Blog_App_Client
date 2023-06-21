import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Avatar, List, Space, Dropdown } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined, DashOutlined } from '@ant-design/icons'
import defaultAvatar from '../assets/img/defaultAvt.png'
import optionIcon from '../assets/img/ellip.svg'
const apiUrl = process.env.REACT_APP_SERVER_URL;

const PostList = () => {
  const navigate = useNavigate()
  const limit = 2 // Limit the number of posts per page
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPost, setTotalPost] = useState(0);
  const [posts, setPosts] = useState([])
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPageParam = searchParams.get('page');
    if (currentPageParam) {
      setcurrentPage(parseInt(currentPageParam));
    }
  }, [location.search]);

  useEffect(() => {
    const showPosts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/blog`, {
          params: {
            limit: limit,
            currentPage: currentPage
          }
        })
        setPosts(data.data)
        setTotalPost(data.totalCount)
      } catch (err) {
        console.log(err);
      }
    }

    showPosts()
  }, [currentPage])

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const itemsOptions = [
    {
      label: <a href="#">Chỉnh sửa bài viết</a>,
      key: '0',
    },
    {
      label: <a href="#">Xóa bài viết</a>,
      key: '1',
    }
  ];

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          navigate(`/blog?page=${page}`)
          setcurrentPage(page)
        },
        pageSize: limit,
        total: totalPost,
        current: currentPage
      }}
      dataSource={posts}

      renderItem={(item) => (
        <List.Item
          key={item._id}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={item.postImage}
            />
          }
        >
          <List.Item.Meta
            title={<a href={`/blog/${item._id}`}>{item.title}</a>}
            avatar={
              <div>
                {item.author && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                      <Avatar src={item.author.avatarImage || defaultAvatar} />
                      <span style={{ marginLeft: '10px' }}>{item.author.username}</span>
                    </div>
                    <div className="icon-option">
                      <Dropdown
                        menu={{
                          itemsOptions,
                        }}
                        trigger={['click']}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <img style={{ width: '20px', color: '#757575' }} src={optionIcon} alt="optionIcon" />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                )}
              </div>
            }
            description={
              <div>
                <div>{item.description}</div>
              </div>
            }
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

export default PostList;