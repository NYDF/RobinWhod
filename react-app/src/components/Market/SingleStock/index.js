
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddAsset from '../../Asset/AddAsset';
import BuyAsset from '../../Asset/BuyAsset';
import DeleteAsset from '../../Asset/DeleteAsset';
import LoadCash from '../../Asset/LoadCash';
import LoadOneAsset from '../../Asset/LoadOneAsset';
import SellAsset from '../../Asset/SellAsset';
import SingleStockGraph from '../SingleStockGraph';


import './SingleStock.css'


function SingleStock() {

  const [marketPrice, setMarketPrice] = useState();
  const [isBuy, setIsBuy] = useState(true);
  const { symbol } = useParams();


  return (
    <div className='Single-Stock-page-container'>
      <div className='Single-Stock-page-left'>
        <SingleStockGraph marketPrice={marketPrice} setMarketPrice={setMarketPrice} />
      </div>

      <div className='Single-Stock-page-right'>

        <div>
          <button onClick={(e) => setIsBuy(true)}>Buy {symbol}</button>
        </div>

        <div>
          <button onClick={(e) => setIsBuy(false)}>Sell {symbol}</button>
        </div>

        {isBuy && (
          <>

            <>
              <AddAsset marketPrice={marketPrice} />
            </>

            <>
              <BuyAsset marketPrice={marketPrice} />
            </>

            <>
              <LoadOneAsset marketPrice={marketPrice} />
            </>

          </>
        )}
        
        {!isBuy && (
          <>


            <>
              <SellAsset marketPrice={marketPrice} />
            </>

            <>
              <DeleteAsset marketPrice={marketPrice} />
            </>

            <>
              <LoadCash marketPrice={marketPrice} />
            </>

          </>
        )}




        <>
          add to list function
        </>
      </div>
    </div>
  );
}

export default SingleStock;
