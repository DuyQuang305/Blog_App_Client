import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { useFormik } from 'formik';
import { sendMessageSchema } from '../../util/validationSchema';

const apiUrl =  process.env.REACT_APP_SERVER_URL


function PasswordReset() {
  const navigate = useNavigate();

  useEffect( () => {
    if (localStorage.getItem('blog-app-user')) {
          navigate('/')
    }
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: sendMessageSchema,

    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(`${apiUrl}/auth/sendMessage`, {
          email: values.email,
        });

        if (!data.status) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
      } catch (error) {
        toast.error('Failed to send email!');
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
          <div className="wrap-input email-input">
            <label className="lable-email" htmlFor="email">
              Email:
            </label>
            <input type="text" 
                    placeholder="email" 
                    name='email'
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.email} />
            {formik.touched.email && formik.values.email && (
                        <span className='form__message--error'>{formik.errors.email}</span>
            )} 
          </div>
          <button className="btn_submit" type="submit">
            Send
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

export default PasswordReset;