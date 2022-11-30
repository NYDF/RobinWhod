
import React from 'react';
import logo from '../../../img/logo.png'
import { NavLink } from 'react-router-dom';


import './SplashNavBar.css'


function SplashNavBar() {

  return (

    <div className='Splash-nav-container'>
      <div className='Splash-nav-left'>
      <span className='Splash-nav-title'>RobinWhod</span>
      <img id='logo' src={logo} />

      </div>

      <div className='Splash-nav-right'>
      <NavLink className='splash-nav-signup-button' to={`/sign-up`}>Sign up</NavLink>
      <NavLink className='splash-nav-login-button' to={`/login`}>Log in</NavLink>

      </div>

    </div>
  );
}

export default SplashNavBar;
