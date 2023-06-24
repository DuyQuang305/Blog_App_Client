import react, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Input, message} from 'antd';
import { withError } from 'antd/es/modal/confirm';
const { TextArea } = Input;
const apiUrl = process.env.REACT_APP_SERVER_URL;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const FormNewPost = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('');

  const token = JSON.parse(localStorage.getItem('blog-app-accessToken'))

  const [form] = Form.useForm();

  const onFinish = async  (values) => {
    try {
      setTitle(values.title)
      setDescription(values.description)
      setContent(values.content)

      if (title && content && description && imageUrl) {
        const {data} = await axios.post(`${apiUrl}/blog/addBlog`, {
          title: title, 
          content: content, 
          description: description,
          postImage: imageUrl,
        }, {
            headers: {
              'Authorization': `bearer ${token}` 
            }
          }
        )
        navigate('/blog')
        console.log(data);
      }
      // form.resetFields();
    } catch(err) {
      console.log(err);
    }
  };

  const convertToBase64 = async (e) => {
    const file = e.target.files[0]
    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageUrl(reader.result)
    };
    reader.onerror = error => {
      console.log('Error:', error);
    };
  }
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container__upload-blog">
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          marginTop: '20px'
        }}
      >
        <h1 style={{marginTop: '30px', fontSize:'26px'}}>Đăng bài viết</h1>
        <Form.Item label="Tiêu đề" name="title">
            <TextArea />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
            <TextArea />
        </Form.Item>
        <Form.Item label="Nội dung" name="content">
            <TextArea />
        </Form.Item>
        <input type="file" name = 'file' onChange={convertToBase64}/>
        <Form.Item {...tailLayout} style={{marginTop: '30px'}}>
          <Button type="primary" htmlType="submit" style={{width: '200px'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormNewPost;