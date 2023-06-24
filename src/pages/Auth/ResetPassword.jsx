import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate,useParams} from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPassWordSchema } from '../../util/validationSchema';

const apiUrl =  process.env.REACT_APP_SERVER_URL


function SetNewPassword() {
  const { token } = useParams();
  
  const navigate = useNavigate();

  useEffect( () => {
    if (localStorage.getItem('blog-app-user')) {
          navigate('/')
    }
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    }, 

    validationSchema: resetPassWordSchema,

    onSubmit: async (values) => {
      try {
            const response = await axios.post(`${apiUrl}/auth/resetPassword/${token}`, {
              password: values.password,
              confirmPassword: values.confirmPassword,
            });
            
            const data = response.data;
      
            if (response.status === 200) {
              toast.success(data.message)
              setTimeout(() => {
                navigate("/login");
              }, 5000);
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              toast.error('Invalid or expired token. Please try again.');
            } else {
              const errorMessage = error.response.data.payload[0].msg
              toast.error(errorMessage);
            }
          }

         formik.handleReset();

    }
  })
  return (
    <div className="wrap-auth">
      <div className="container-auth__new-password">
        <div className="title">
          <h4>Enter your email to receive the verification code</h4>
        </div>
        <form className="auth-form" onSubmit={formik.handleSubmit}>
          <div className="wrap-input password-input">
            <label className="lable-password" htmlFor="Password">
              Password:
            </label>
            <input  type="password" 
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

          <div className="wrap-input password-input">
            <label className="lable-password" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input  type="password" 
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
          <button className="btn_submit" type="submit">
            Reset Password
          </button>
          <span className="text">
            <span>Do you have an Account?</span>
            <Link to="/login">Login</Link>
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
  );
}

export default SetNewPassword;