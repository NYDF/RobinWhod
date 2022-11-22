import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "../signupForm/signupForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrors([]);
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else if (password !== repeatPassword) {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/channels/@me'/>;
  }

  return (
    <div className='signup-page'>
      <div className='signup-form'>
        <form onSubmit={onSignUp}>
          <div className='form-title'>
            <h1>Create an account </h1>
          </div>
          <div className='error2-lists'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='u-e-p-c-div'>
            <div className='s-e-font'>
              <label>EMAIL</label>
            </div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='u-e-p-c-div'>
            <div className='u-font'>
              <label>USERNAME</label>
            </div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>

          <div className='u-e-p-c-div'>
            <div className='s-p-font'>
              <label>PASSWORD</label>
            </div>

            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='u-e-p-c-div'>
            <div className='c-p-font'>
              <label>CONFIRM  PASSWORD</label>
            </div>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
          <div className='signup-button'>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
        <div className='link-login'>
          <Link to={"/login"}>Already have an account?</Link>
        </div>
        {/* <DemoUserLogin /> */}
      </div>
    </div>

  );
};

export default SignUpForm;
