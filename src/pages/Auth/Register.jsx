import React, {useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../util/validationSchema';

const apiUrl =  process.env.REACT_APP_SERVER_URL


 function Register() {
    const navigate = useNavigate()

    useEffect( () => {
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
              `${apiUrl}/register/addUser`,
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
                }, 5000);
          }
    
          } catch (error) {
              toast.error(error.message);
          }

          formik.handleReset();

      }
    })

  return (
      <div className="wrap-auth">
            <div className='container-auth__register'>
                <div className='title'>
                  <h2>Register</h2>
                </div>
                <form className='auth-form' onSubmit={formik.handleSubmit}>
                  <div className='wrap-input username-input'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.username && formik.values.username && (
                        <span className='form__message--error'>{formik.errors.username}</span>
                      )} 
                  </div>

                  <div className="wrap-input email-input">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name = 'email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.email && formik.values.email && (
                        <span className='form__message--error'>{formik.errors.email}</span>
                      )} 
                  </div>

                  <div className='wrap-input password-input'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.touched.password && formik.values.password && (
                        <span className='form__message--error'>{formik.errors.password}</span>
                      )} 
                  </div>

                  <div className='wrap-input confirmPassword-input'>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                      { formik.touched.confirmPassword && formik.values.confirmPassword && (
                        <span className='form__message--error'>{formik.errors.confirmPassword}</span>
                      )} 
                  </div>
                  <button className='btn_submit' type="submit">Register</button>
                  <span className='text'>
                        <span>Do you have an Account?</span>
                       <Link to="/login" >Login</Link>
                  </span>
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