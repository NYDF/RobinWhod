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
      {allAssetArr.map((asset) => (
        <NavLink
          to={`/stocks/${asset.symbol}`}
          key={asset.id}>
          <div className="single-channel-in-server">


            <div className="single-channel-in-server-name">
              stock:{asset.symbol}
            </div>

            <div className="single-channel-in-server-name">
              how many you own : {asset.quantity}
            </div>

            <SmallGraph symbol={asset.symbol} />

          </div>

          <hr></hr>
        </NavLink>
      ))}
    </>
  );
};

export default GetAllAsset;
