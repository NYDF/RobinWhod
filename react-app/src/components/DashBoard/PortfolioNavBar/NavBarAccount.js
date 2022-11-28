import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import { calculatePortfolio } from '../../../utils/helperFunc';
import "./PortfolioNavBar.css"

import { signUp } from '../../../store/session';

const NavBarAccount = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const assets = useSelector((state) => state.assetReducer);
  const portfolio = calculatePortfolio(assets)

  const cash = sessionUser?.assets.filter(x => x.symbol == '$')[0]?.quantity

  // console.log( cash)

  if (sessionUser) {
    return (
      <>
        <>{sessionUser?.username}</>
        <br></br>
        <>${portfolio}</>
        <br></br>
        <>Portfolio Value</>
        <br></br>
        <>${cash}</>
        <br></br>
        <>Buying Power</>
        <br></br>
        <LogoutButton />
      </>
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
