import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunkLoadAllStocks } from '../../../store/stockReducer';
import PortfolioNavBar from '../../DashBoard/PortfolioNavBar';


import "./GetAllStocks.css"

// async function fetchYahooData(symbol) {
//   const response = await fetch(
//     `https://yahoo-finance-api.vercel.app/${symbol}`
//   );
//   return response.json();
// }



const GetAllStocks = () => {
  const dispatch = useDispatch();
  let allStocks = useSelector(state => state.stockReducer)
  // console.log('allStocks', allStocks)
  let allStockArr = Object.values(allStocks)
  // console.log('allStockArr---------------', allStockArr)

  const [showModal, setShowModal] = useState(false);
  const closetable = () => {
    (showModal) ? setShowModal(false) : setShowModal(true)
  }


  useEffect(() => {
    dispatch(thunkLoadAllStocks())
  }, [dispatch]);

  return (
    <>
      <PortfolioNavBar showModal={showModal} setShowModal={setShowModal} closetable={closetable}/>
      <div className='all-stock-container'>
        <div className='all-stock-title'>Stock Picks For You</div>
        <hr></hr>

        <div className='all-stock-div-container'>{allStockArr.map((stock) => (
          <NavLink
            to={`/stocks/${stock.symbol}`}
            key={stock.id}>
            <div className='all-stock-name'>{stock.symbol}</div>
          </NavLink>
        ))}</div>
      </div>
    </>
  );
};

export default GetAllStocks;
