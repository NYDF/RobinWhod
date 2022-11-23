import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoUserLogin from '../DemoUser';
import "./loginForm.css"


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
    <div >
      <div >
        <form onSubmit={onLogin}>
          <div >
            <h2>Welcome to RobinWhod</h2>
          </div>
          <div >
            <h3>We're so excited to see you!</h3>
          </div>
          <div className='error-lists'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div >
            <div >
              <label htmlFor='email'>EMAIL</label>
            </div>

            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />


          </div>
          <div >
            <div >
              <label htmlFor='password'>PASSWORD</label>
            </div>
            <div>
              <input
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
              />
            </div>

            <div >
              <button type='submit'>Log In</button>
            </div>
          </div>
        </form>
        <div className='Demo-button'>
          <DemoUserLogin />
        </div>
        <div className='link-register'>
          <span>Need an account?</span>
          <span> <Link to={"/sign-up"}>Register</Link></span>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
