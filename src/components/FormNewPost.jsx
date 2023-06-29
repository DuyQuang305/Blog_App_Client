import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const apiUrl = process.env.REACT_APP_SERVER_URL;
function BlogForm() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
         // Tạo đối tượng FormData để gửi dữ liệu đến server
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      formData.append('postImage', postImage);
    // Gửi dữ liệu đến server
      if (title && content && description) {
        const {data} = await axios.post(`${apiUrl}/blog/addBlog`, formData, {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('blog-app-accessToken'))}`
          }
        })
        navigate('/blog')
    }
      } catch (error) {
        console.log(error);
      }
     
  };

  const handleFileChange = (event) => {
    setPostImage(event.target.files[0]);
  };  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div>
        <label htmlFor="title" style={{ fontWeight: "bold", marginBottom: "8px" }}>Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: "8px", marginBottom: "16px", borderRadius: "4px", border: "1px solid #ccc" }} />
      </div>
      <div>
        <label htmlFor="description" style={{ fontWeight: "bold", marginBottom: "8px" }}>Description:</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: "8px", marginBottom: "16px", borderRadius: "4px", border: "1px solid #ccc" }} />
      </div>
      <div>
        <label htmlFor="content" style={{ fontWeight: "bold", marginBottom: "8px" }}>Content:</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} style={{ padding: "8px", marginBottom: "16px", borderRadius: "4px", border: "1px solid #ccc" }} />
      </div>
      <div>
        <label htmlFor="file" style={{ fontWeight: "bold", marginBottom: "16px" }}>File:</label>
        <input type="file" id="file" onChange={handleFileChange} style={{ display: "none" }} />
        <label htmlFor="file" style={{ padding: "8px", marginBottom: "16px", backgroundColor: "#007bff", color: "#fff", borderRadius: "4px", cursor: "pointer", display: "inline-block" }}>Choose File</label>
        <span style={{ marginLeft: "8px" }}>{postImage ? postImage.name : "No file chosen"}</span>
      </div>
      <button type="submit" style={{ padding: "8px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Submit</button>
    </form>
  );
}

export default BlogForm;