
import React from 'react';
import { NavLink } from 'react-router-dom';
import SplashNavBar from '../SplashNavBar';

import './Splash.css'


function Splash() {

  return (
    <>
    <SplashNavBar />
    <div className='Splash-page-container'>

      <div className='splash-first-page-container'>
        <div className='splash-first-page-word-1'>
          Run your money
        </div>
        <br></br>
        <div className='splash-first-page-word-2'>
          Invest with stocks, crypto, and cash
        </div>

        <div className='splash-first-page-word-2'>
          on your terms.
        </div>
        <br></br>
        <div className='splash-login'>
          <NavLink className='splash-login-button' to={`/login`}>Get Started</NavLink>
        </div>
      </div>
    </div>
    </>
  );
}

export default Splash;
