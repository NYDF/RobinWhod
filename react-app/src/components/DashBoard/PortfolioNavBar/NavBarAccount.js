import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import { calculatePortfolio } from '../../../utils/helperFunc';
import "./PortfolioNavBar.css"
import { BiExit } from "react-icons/bi"

import { signUp } from '../../../store/session';

const NavBarAccount = ({ setShowModal }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assetReducer);
  const portfolio = calculatePortfolio(assets)

  const cash = sessionUser?.assets.filter(x => x.symbol == '$')[0]?.quantity

  // console.log( cash)

  if (sessionUser) {
    return (
      <div id='nav-account'>
        <div className='acc-word-name' >{sessionUser?.username}</div>

        {/* <div className='acc-word-container'>
          <div className='acc-word-left'>
            <div className='acc-word-number'>${portfolio}</div>

            <div className='acc-word-word'>Portfolio Value</div>
          </div>

          <div className='acc-word-right'>
            <div className='acc-word-number'>${cash}</div>

            <div className='acc-word-word'>Buying Power</div>
          </div>

        </div> */}
        <hr></hr>
        <div className='add-logout-container'>
          <span className='logout-icon'><BiExit /></span>
          <span className='logout-button'><LogoutButton /></span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        Please Sign Up to access!
        <div className='link-signup'>
          <Link to={"/sign-up"}>Sign Up</Link>
        </div>
      </>
    )
  }
};

export default NavBarAccount;
