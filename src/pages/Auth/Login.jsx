import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './css/main.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { loginSchema } from '../../util/validationSchema';
import { useGoogleLogin } from '@react-oauth/google';
import ggImg from '../../assets/img/google.svg'
import bg_img from './img/login_img.png'
import fb_img from './img/fb_icon.svg'

const apiUrl = process.env.REACT_APP_SERVER_URL

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('blog-app-user')) {
      navigate('/')
    }
  })

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const access_token = codeResponse.access_token
      const response = await axios.post(`${apiUrl}/auth/google`, {
        access_token,
      });

      if ((response && response.status === 201) || (response && response.status === 200)) {
        localStorage.setItem("blog-app-accessToken", JSON.stringify(response.data.accessToken));

        navigate("/")
      } else {
        toast.error(response.data.msg)
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {

      try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
          username: values.username,
          password: values.password,
        });

        if (response && response.status === 201) {
          console.log(response.data.accessToken)
          localStorage.setItem("blog-app-accessToken", JSON.stringify(response.data.accessToken));

          navigate("/")
        } else {
          toast.error(response.data.msg)
        }

      } catch {

      }

      formik.handleReset();
    }

  })

  return (
    <div className="wrap-auth">
      <div className='login__container'>
        <div className='login__image'>
          <img src={bg_img} alt="background_image" />
        </div>
        <form className='auth-login__form' onSubmit={formik.handleSubmit}>
          <div className="login__title">
            Welcome to <span style={{ color: '#6358DC', fontSize: '26px' }}>Blossom</span>
          </div>

          <div className='wrap-input username-input'>
            <div className="group__input">
              <input
                id='name'
                type="text"
                name='username'
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>
            {formik.touched.username && formik.values.username && (
              <span className='form__message--error'>{formik.errors.username}</span>
            )}
          </div>

          <div className='wrap-input password-input'>
            <div className="group__input">
              <input
                type="password"
                placeholder="Password"
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.values.password && (
              <span className='form__message--error'>{formik.errors.password}</span>
            )}
          </div>
          <button className='btn_submit' type="submit">LOGIN</button>

          <div className="login__form-underlined">
            <hr />
            <span style={{
              marginLeft: '20px',
              marginRight: '20px',
              fontWeight: '400'
            }}>OR</span>
            <hr />
          </div>

          <div className="socical__wrap">
            <button onClick={() => loginGoogle()} className='social-btn social-btn__google'>
              <img src={ggImg} alt="google" />
              <span>Login with Google</span>
            </button>

            <button onClick={() => loginGoogle()} className='social-btn social-btn__facebook'>
              <img src={fb_img} alt="facebook" />
              <span>Login with Facebook</span>
            </button>
          </div>

          <div className='login__text'>
            <div style={{marginBottom: '10px'}} className="login__text-register">
              <span>Don't have an Account?</span>
              <Link style={{marginLeft: '10px'}} to="/register">Register</Link>
            </div>
            <Link style={{fontSize: '20px'}} to="/send-message">Forgot Password</Link>
          </div>

        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  )
}

export default Login;      
