import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { thunkLoadAllAsset } from '../../../store/assetReducer';
import SmallGraph from '../../DashBoard/SmallGraph';

import bulbimg from '../../../img/bulb.png'

import "./GetAllAsset.css"


const GetAllAsset = () => {
  const dispatch = useDispatch();
  let allAsset = useSelector(state => state.assetReducer)
  // console.log('allAsset!!!!!!!!!!!!!!', allAsset)
  let allAssetArr = Object.values(allAsset)?.filter(x => x.is_cash == false)
    // console.log('allAsset!!!!!!!!!!!!!!', allAsset)

  useEffect(() => {
    dispatch(thunkLoadAllAsset())
  }, [dispatch]);



  return (
    <>
      <div className='portfolio-bar-title'>
        <img id='bulb-img' src={bulbimg} />
        Stocks
      </div>

      <hr></hr>

      <div className='portfolio-bar-asset'>
        My Portfolio
      </div>

      <div className='single-asset-container-big'>
        {allAssetArr.map((asset) => (
          <NavLink
            to={`/stocks/${asset.symbol}`}
            key={asset.id}>
            <div className="single-asset-container">

              <div className="single-asset-first-column">
                <span className="first-column-name">{asset.symbol}</span>
                <br></br>
                <span className="first-column-number">{asset.quantity}shares</span>
              </div>

              <SmallGraph symbol={asset.symbol} />

            </div>

          </NavLink>
        ))}
      </div>
    </>
  );
};

export default GetAllAsset;
