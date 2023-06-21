import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value) => console.log(value);
const SearchComponent = () => (
  <Space direction="vertical" style={{display: 'flex', 
                                      flexDirection: 'column',
                                      alignItems: 'center'}}>
    <Search placeholder="Tìm kiếm blog" style={{width: '380px'}} onSearch={onSearch} enterButton />
  </Space>
);
export default SearchComponent;