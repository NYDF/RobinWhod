import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import { thunkLoadCash, thunkLoadAllAsset } from '../../../store/assetReducer';

import { getEachStockCurrentPrice } from '../../../utils/helperFunc';

import { BiExit } from "react-icons/bi"
import { BiArchive } from "react-icons/bi";


import "./PortfolioNavBar.css"

const NavBarAccount = () => {
  const dispatch = useDispatch();
  const [totalAssetCash, setTotalAssetCash] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  let allAsset = useSelector(state => state.assetReducer)
  let allAssetArr = Object.values(allAsset)
  const cash = allAssetArr?.filter(x => x.symbol == '$')[0]?.quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })


  useEffect(() => {
    dispatch(thunkLoadCash())
  }, [dispatch])


  useEffect(() => {
    dispatch(thunkLoadAllAsset()).then(res => {
      let assetArrr = res.assets

      const stockOwned = {}
      assetArrr?.forEach(
        (stock) => (stockOwned[stock.symbol] = stock.quantity)
      );
      // console.log('stockOwned', stockOwned )

      getEachStockCurrentPrice(stockOwned).then((
        function (data) {
          // console.log('data------------------', data);
          let x = data

          let sum
          if (x.length) {
            sum = Number(x.reduce((a, e) => Number(a) + Number(e)))
          }
          else { sum = 0 }
          // console.log('sum!!!!!!!!!!!!!!!', sum)

          setTotalAssetCash((sum).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }))
        }
      ))
    }

    )
  }, [dispatch]);



  // console.log('cash!!!!!!!!!!!!!!!', cash)


  if (!allAsset) { return null }
  if (!cash) { return null }

  if (sessionUser) {
    return (
      <div id='nav-account'>
        <div className='acc-word-name' >{sessionUser?.username}</div>

        <div className='nav-bar-second-row-container'>
        <div className='nav-bar-second-row-left'>
          <div className='nav-bar-second-number'>{totalAssetCash}</div>
          <div>Portfolio Value</div>
        </div>

        <div className='nav-bar-second-row-right'>
          <div className='nav-bar-second-number'>{cash}</div>
          <div>Buying Power</div>
        </div>

        </div>

        <hr></hr>
        <Link
          to={(`/transactions`)}>
          <div className='add-logout-container'>
            <span className='logout-icon'><BiArchive /></span>
            <span className='logout-button'><button className='mol-logout-button'>Transaction History</button></span>
          </div>

        </Link>
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
