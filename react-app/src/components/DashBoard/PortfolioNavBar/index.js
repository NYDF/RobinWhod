
import React from 'react';
import logo from '../../../img/logo.png'
import { NavLink } from 'react-router-dom';


import './PortfolioNavBar.css'


function PortfolioNavBar() {

  return (

    <div className='Splash-nav-container'>
      <div className='Splash-nav-left'>
        <img id='logo' src={logo} />

      </div>

      <div className='Portfolio-nav-right'>
        <span >Cash Card</span>
        <span >Learn</span>
        <span >Snacks</span>
        <span >Support</span>
        <span><button>
          Account
        </button></span>

      </div>

    </div>
  );
}

export default PortfolioNavBar;
