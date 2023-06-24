import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './css/main.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../util/validationSchema';
import bg_img from './img/login_img.png'

const apiUrl = process.env.REACT_APP_SERVER_URL


function Register() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('blog-app-user')) {
      navigate('/')
    }
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: registerSchema,


    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/auth/register`,
          {
            username: values.username,
            email: values.email,
            password: values.password,
          }
        );

        if (!data.status) {
          toast.error(data.msg);
        } else if (data.status === true) {
          toast.success(data.msg)
          setTimeout(() => {
            navigate("/login");
          }, 5000)
        }

      } catch (error) {
        toast.error(error.message);
      }

      formik.handleReset();

    }
  })

  return (
    <div className="wrap-auth">
      <div className='register__container'>
        <div className='register__image'>
          <img src={bg_img} alt="background_image" />
        </div>
        <form className='auth-register__form' onSubmit={formik.handleSubmit}>
          <div className="register__title">
            Welcome to <span style={{ color: '#6358DC', fontSize: '26px' }}>Blossom</span>
          </div>
          <div className='wrap-input username-input'>
            <div className="group__input">
              <input
                type="text"
                placeholder="Username"
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.username && formik.values.username && (
              <span className='form__message--error'>{formik.errors.username}</span>
            )}
          </div>

          <div className="wrap-input email-input">
            <div className="group__input">
              <input
                type="email"
                placeholder="Email"
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.values.email && (
              <span className='form__message--error'>{formik.errors.email}</span>
            )}
          </div>

          <div className='wrap-input password-input'>
            <div className="group__input">
              <input
                type="password"
                placeholder="Password"
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.values.password && (
              <span className='form__message--error'>{formik.errors.password}</span>
            )}
          </div>

          <div className='wrap-input confirmPassword-input'>
            <div className="group__input">
              <input
                type="password"
                placeholder="Confirm Password"
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.confirmPassword && formik.values.confirmPassword && (
              <span className='form__message--error'>{formik.errors.confirmPassword}</span>
            )}
          </div>
          <button className='btn_submit' type="submit">Register</button>
          <div className='register__text'>
            <span>Do you have an Account?</span>
            <Link style={{marginLeft: '10px'}} to="/login" >Login</Link>
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

export default Register;      