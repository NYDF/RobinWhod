
import React from 'react';
import logo from '../../../img/logo.png'
import NavBarAccount from './NavBarAccount';
import { NavLink } from 'react-router-dom';

import './PortfolioNavBar.css'

function PortfolioNavBar({ showModal, setShowModal, closetable }) {

  return (

    <div className='Splash-nav-container'>

      <div className='Splash-nav-left'>
        <NavLink
          to={(`/portfolio`)}>

          <img id='logo-P' src={logo} />

        </NavLink>

      </div>


      <div className='Portfolio-nav-right' >

        <span className='Portfolio-nav-right-acc-btn' onClick={closetable} >
          <button id="show-acc-btn" > Account </button>
        </span>

        <div className="Nav-acc-container">
          {showModal && (

            <NavBarAccount setShowModal={setShowModal} />

          )}
        </div>

      </div>

    </div>
  );
}

export default PortfolioNavBar;
