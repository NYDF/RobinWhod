import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunkLoadAllAsset } from '../../../store/assetReducer';
import SmallGraph from '../../DashBoard/SmallGraph';

import "./GetAllAsset.css"


const GetAllAsset = () => {
  const dispatch = useDispatch();
  let allAsset = useSelector(state => state.assetReducer)
  // console.log('allAsset!!!!!!!!!!!!!!', allAsset)
  let allAssetArr = Object.values(allAsset)

  useEffect(() => {
    dispatch(thunkLoadAllAsset())
  }, [dispatch]);



  return (
    <>
      <div className='portfolio-bar-title'>
        Stocks
      </div>
      <hr></hr>
      <div className='portfolio-bar-asset'>
        My Portfolio
      </div>
      <br></br>
      <>
        {allAssetArr.map((asset) => (
          <NavLink
            to={`/stocks/${asset.symbol}`}
            key={asset.id}>
            <div className="single-asset-container">

              <div className="single-asset-first-column">
                <span className="first-column-name">{asset.symbol}</span>
                <br></br>
                <span className="first-column-number">{asset.quantity} shares</span>
              </div>

              <SmallGraph symbol={asset.symbol} />

            </div>



          </NavLink>
        ))}
      </>
    </>
  );
};

export default GetAllAsset;
