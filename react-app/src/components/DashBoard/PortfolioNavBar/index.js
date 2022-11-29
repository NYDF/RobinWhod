
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../../img/logo.png'
import { Modal } from '../../../context/Modal';
import NavBarAccount from './NavBarAccount';
import { NavLink } from 'react-router-dom';

import './PortfolioNavBar.css'


function PortfolioNavBar() {

  const [showModal, setShowModal] = useState(false);

  return (

    <div className='Splash-nav-container'>

      <NavLink
        to={(`/portfolio`)}>
        <div className='Splash-nav-left'>
          <img id='logo' src={logo} />
        </div>
      </NavLink>

      <div className='Portfolio-nav-right'>

        <span className='add to watchlist-div' onClick={() => setShowModal(true)}>
          <button id="show-modal-button"> Account </button>
        </span>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <NavBarAccount setShowModal={setShowModal}/>
          </Modal>
        )}


      </div>

    </div>
  );
}

export default PortfolioNavBar;
