import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';

import { thunkGetOneAsset } from '../../../store/assetReducer';

import "./LoadOneAsset.css"


const LoadOneAsset = () => {
  const dispatch = useDispatch();
  const {symbol} = useParams();
  let currentAsset = useSelector(state => state.assetReducer)
  // console.log('currentAsset!!!!!!!!!!!!!!', currentAsset)
  let currentAssetValue = Object.values(currentAsset)[0]
  // console.log('currentAssetValue!!!!!!!!!!!!!!', currentAssetValue)

  useEffect(() => {
    dispatch(thunkGetOneAsset(symbol))
  }, [dispatch]);

  if(!currentAsset){return null}


  return (
    <>
    current asset name = {symbol}
    <br></br>
      <>how many shares you have: {currentAssetValue?.quantity}</>
      <br></br>
      <>your average price: {currentAssetValue?.purchased_price}</>
      <hr></hr>
    </>
  );
};

export default LoadOneAsset;
