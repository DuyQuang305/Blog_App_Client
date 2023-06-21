import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Layout} from 'antd';
import PostList from './PostList';

const { Content } = Layout;

const ContentBlog = (props) => {
  const currentUser = props.currentUser
  return (
    <Content className='container-content' style={{margin: '20px 0 0 20px', 
                                            height: '100vh', 
                                            overflowY: 'auto',
                                            overflowX: 'hidden'}}>
        <div className="container-content-top">
            <h1 style={{fontSize: '26px'}}>Bài viết nổi bật</h1>
            <span style={{marginTop: '10px'}}
            >
                Tổng hợp các bài viết chia sẻ các chủ đề liên quan đến cuộc sống.
            </span>
        </div>
        <div style={{marginTop: '10px'}} className="container-content-body">
            <span style={{fontSize: '16px', color: '#757575', marginTop:'20px'}}>CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</span>
            <ul className="topics__list">
                <li className="topics__item">
                    <Link className='topics__item-link' to='#'>Thời trang, làm đẹp</Link>
                </li>
                <li className="topics__item">
                    <Link className='topics__item-link' to='#'>Du lịch</Link>
                </li>
                <li className="topics__item">
                    <Link className='topics__item-link' to='#'>Công nghệ</Link>
                </li>
                <li className="topics__item">
                    <Link className='topics__item-link' to='#'>Nội thất</Link>
                </li>
            </ul>
        </div>

        <PostList />
    </Content>
  )
}

export default ContentBlog