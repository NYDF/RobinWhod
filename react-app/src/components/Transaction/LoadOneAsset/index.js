import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { thunkGetOneAsset } from '../../../store/assetReducer';
import SellDeleteAsset from '../SellDeleteAsset';

import "./LoadOneAsset.css"


const LoadOneAsset = ({ marketPrice }) => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  let currentAsset = useSelector(state => state.assetReducer)
  // console.log('currentAsset!!!!!!!!!!!!!!', currentAsset)
  let currentAssetValue = Object.values(currentAsset).filter(x => x.symbol == symbol)[0]
  // console.log('currentAssetValue!!!!!!!!!!!!!!', currentAssetValue)
  let numShares = currentAssetValue?.quantity

  useEffect(() => {
    dispatch(thunkGetOneAsset(symbol))
  }, [dispatch]);

  if (!currentAsset) { return null }


  return (
    <div className='sell-container'>
      <div className='sell-word'>
        <span>Order Type</span>
        <span>Market Order</span>
      </div>

      <div className='sell-quantity-container'>
        <span>Sell In</span>
        <span >Shares</span>
      </div>

      <div><SellDeleteAsset marketPrice={marketPrice} numShares={numShares} /></div>

      {!!currentAssetValue && <div className='sell-btn-down'>{currentAssetValue?.quantity} Shares Available</div>}
      {!currentAssetValue && <div className='sell-btn-down'>You dont have this stock</div>}

    </div>
  );
};

export default LoadOneAsset;
