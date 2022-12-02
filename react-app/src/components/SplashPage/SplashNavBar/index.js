
import React from 'react';
import logo from '../../../img/logo.png'
import linkedin from '../../../img/linkedin.png'
import github from '../../../img/github.png'
import { NavLink } from 'react-router-dom';


import './SplashNavBar.css'


function SplashNavBar() {

  return (

    <div className='Splash-nav-container'>
      <div className='Splash-nav-left'>
        <span className='Splash-nav-title'>RobinWhod</span>
        <img id='logo' src={logo} />
        <div className='About-link-port-div'>
          <div className='About-link-port'>Link to Developer'
            <a href=" https://www.linkedin.com/in/dongfang-song-25261218a/"><img id='linkedin' src={linkedin} /></a>
            <a href=" https://github.com/NYDF"><img id='github' src={github} /></a>
          </div>
        </div>
      </div>

      <div className='Splash-nav-right'>
        <NavLink className='splash-nav-signup-button' to={`/sign-up`}>Sign up</NavLink>
        <NavLink className='splash-nav-login-button' to={`/login`}>Log in</NavLink>

      </div>

    </div>
  );
}

export default SplashNavBar;
