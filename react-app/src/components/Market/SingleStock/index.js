
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import LoadCash from '../../Asset/LoadCash';
import LoadOneAsset from '../../Asset/LoadOneAsset';
import AddToWatchlistModal from '../../WatchList/AddToWatchlist';
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

        <span>
          <button onClick={(e) => setIsBuy(true)}>Buy {symbol}</button>
        </span>

        <span>
          <button onClick={(e) => setIsBuy(false)}>Sell {symbol}</button>
        </span>

        {!isBuy && (
          <>
            <>
              <LoadOneAsset marketPrice={marketPrice} />
            </>
          </>
        )}

        {isBuy && (
          <>
            <>
              <LoadCash marketPrice={marketPrice} />
            </>
          </>
        )}
        <>
          <AddToWatchlistModal />
        </>
      </div>
    </div>
  );
}

export default SingleStock;
