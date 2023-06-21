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

  const convertToBase64 = (e) => {
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

  const onFinish = async  (values) => {
    try {
      await setTitle(values.title)
      await setDescription(values.title)
      await setContent(values.title)

      const uploadPost = async() => {
        if (title, content, description) {
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
          console.log(data);
        }
      
      }
      uploadPost()

      form.resetFields();
    } catch(err) {
      console.log(withError);
    }
  };
  
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
        <input accept='image.*' type="file" onChange={convertToBase64}/>
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