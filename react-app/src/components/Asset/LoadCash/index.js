import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { thunkLoadCash, thunkGetOneAsset } from '../../../store/assetReducer';

import BuyAsset from '../BuyAsset';

import "./LoadCash.css"
import AddAsset from '../AddAsset';


const LoadCash = ({ marketPrice }) => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const [isNew, setIsNew] = useState(false);


  let currentCash = useSelector(state => state.assetReducer)
  let allAssetArr = Object.values(currentCash)
  const cash = allAssetArr?.filter(x => x.symbol == '$')[0]?.quantity.toFixed(2)
  console.log('currentCash!!!!!!!!!!!!!!', currentCash)
  let currentAsset = useSelector(state => state.assetReducer)

  let currentAssetValue = Object.values(currentAsset).filter(x => x.symbol == symbol)[0]
  // console.log('currentAssetValue!!!!!!!!!!!!!!', currentAssetValue)

  const buyingPower = currentCash?.quantity?.toFixed(2)

  useEffect(() => {
    dispatch(thunkLoadCash())
    dispatch(thunkGetOneAsset(symbol))
  }, [dispatch]);

  useEffect(() => {
    if (currentAssetValue == undefined) { setIsNew(true) } else { setIsNew(false) }
  }, [dispatch, currentAsset]);

  // console.log('isNew++++++++++++',isNew)

  if (currentAsset.length) { setIsNew(false) }

  if (!currentCash) { return null }



  return (
    <>
      <div className='sell-word'>
        <span>Order Type</span>
        <span>Market Order</span>
      </div>

      <div className='sell-quantity-container'>
        <span>Sell In</span>
        <span >Shares</span>
      </div>


      {(!isNew && <div>
        <BuyAsset marketPrice={marketPrice} buyingPower={buyingPower} />
      </div>)}

      {(isNew && <div>
        <AddAsset marketPrice={marketPrice} buyingPower={buyingPower} />
      </div>)}

      <div className='sell-btn-down'>$ {cash} buying power available</div>

    </>
  );
};

export default LoadCash;
