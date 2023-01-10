
import React from 'react';
import logo from '../../../img/logo.png'
import NavBarAccount from './NavBarAccount';
import { NavLink } from 'react-router-dom';

import linkedin from '../../../img/linkedin.png'
import github from '../../../img/github.png'

import './PortfolioNavBar.css'

function PortfolioNavBar({ showModal, setShowModal, closetable }) {

  return (

    <div className='Splash-nav-container'>

      <div className='Splash-nav-left'>
        <NavLink
          to={(`/portfolio`)}>

          <img id='logo-P' src={logo} />

        </NavLink>

        <div className='About-link-port-div'>
          <div className='About-link-port'>Link to Developer'
            <a href=" https://www.linkedin.com/in/dongfang-song-25261218a/"><img id='linkedin' src={linkedin} /></a>
            <a href=" https://github.com/NYDF"><img id='github' src={github} /></a>
          </div>
        </div>

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
