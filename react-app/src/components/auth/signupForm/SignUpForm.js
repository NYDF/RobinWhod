import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../../store/session';
import "../signupForm/signupForm.css"
import signupPic from "../../../img/signup.png"

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
    return <Redirect to='/portfolio' />;
  }

  return (
    <div className='signup-page-container'>

      <div className='signup-page-left'>
        <div className='signup-page-left-top'>
          <div >RobinWhod</div>
          <>Invest with zero commission fees</>
          <>Plus, request 24/7 live support right from the app.</>
        </div>

        <div className='signup-page-left-down'>
          <div className='login-page-left'>
            <img id='signupPic' src={signupPic} />
          </div>
          <>Stocks, options, and ETFs are offered through Robinhood Financial. Crypto is offered through Robinhood Crypto.</>
        </div>

      </div>


      <div className='signup-page-right'>
        <form onSubmit={onSignUp}>
          <div className='signup-form-title'>
            Create an account
          </div>
          <div className='error2-lists'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div >
            <span>
            <input
              type='text'
              name='email'
              className='signup-form-input-bar-half'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
            </span>

            <span>
            <input
              type='text'
              name='username'
              className='signup-form-input-bar-half'
              placeholder='UserName'
              onChange={updateUsername}
              value={username}
            ></input>
            </span>
          </div>

          <div className='u-e-p-c-div'>

            <input
              type='password'
              name='password'
              className='signup-form-input-bar'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='u-e-p-c-div'>

            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm Password'
              className='signup-form-input-bar'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>

            <button className='signup-button' type='submit'>Sign Up</button>

        </form>
        <div className='link-login'>
          <Link to={"/login"}>Already have an account?</Link>
        </div>

      </div>
    </div>

  );
};

export default SignUpForm;
