import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';

import { thunkLoadCash, thunkGetOneAsset } from '../../../store/assetReducer';
import BuyOrCreateAsset from '../BuyOrCreateAsset';

import BuyAsset from '../BuyAsset';

import "./LoadCash.css"
import AddAsset from '../AddAsset';


const LoadCash = ({ marketPrice }) => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const [isNew, setIsNew] = useState(false);


  let currentCash = useSelector(state => state.assetReducer)
  // console.log('currentCash!!!!!!!!!!!!!!', currentCash)
  let currentAsset = useSelector(state => state.assetReducer)

  let currentAssetValue = Object.values(currentAsset).filter(x=>x.symbol==symbol)[0]
  // console.log('currentAssetValue!!!!!!!!!!!!!!', currentAssetValue)

  const buyingPower = currentCash?.quantity?.toFixed(2)

  useEffect(() => {
    dispatch(thunkLoadCash())
    dispatch(thunkGetOneAsset(symbol))
  }, [dispatch]);

  useEffect(() => {
    if(currentAssetValue==undefined){setIsNew(true)}else{setIsNew(false)}
  }, [dispatch, currentAsset]);

  // console.log('isNew++++++++++++',isNew)

  if(currentAsset.length){setIsNew(false)}

  if (!currentCash) { return null }



  return (
    <>
      <div>
        <span>Order Type</span>
        <span>Market Order</span>
      </div>


      {(!isNew &&<>
        <BuyAsset marketPrice={marketPrice} buyingPower={buyingPower}/>
      </>)}

     {( isNew &&<>
        <AddAsset marketPrice={marketPrice} buyingPower={buyingPower}/>
      </>)}

      <>

      </>

      <br></br>
      <>Your cash buyingpower:$ {currentCash?.quantity?.toFixed(2)}</>
      <hr></hr>
    </>
  );
};

export default LoadCash;
