import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoUserLogin from '../DemoUser';
import "./loginForm.css"
import loginPic from '../../../img/login.jpg'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/portfolio' />;
  }

  return (
    <div className='login-page-container'>

      <div className='login-page-left'>
        <img id='loginPic' src={loginPic} />
      </div>

      <div className='login-page-right'>
        <div className='login-page-right-container'>
          <form className='login-form' onSubmit={onLogin}>

            <div className='login-title'>
              Log in to RobinWhod
            </div>

            <div className='login-error-lists'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}

            </div>

            <div >
              <div className='login-word'>
                <label htmlFor='email'>Email</label>
              </div>

              <input
                className='login-input'
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
              />
            </div>

            <br></br>

            <div >
              <div className='login-word'>
                <label htmlFor='password'>Password</label>
              </div>
              <div>
                <input
                  className='login-input'
                  name='password'
                  type='password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>

              <div >
                <button className='login-button' type='submit'>Log In</button>
              </div>

            </div>
          </form>
          <div className='Demo-button'>
            <DemoUserLogin />
          </div>
          <div className='link-register'>
            <span >Not on Robinhood?</span>
            <span className='login-word-button'> <Link to={"/sign-up"}>Create an account</Link></span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
